import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, User } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getConversations, createConversation, getMessages, sendMessage } from "@/lib/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeConversation, setActiveConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const queryClient = useQueryClient();
  const scrollRef = useRef<HTMLDivElement>(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const { data: conversations, isLoading: loadingConversations } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
    enabled: isOpen && !!token,
    refetchInterval: 5000,
  });

  const { data: messages, isLoading: loadingMessages } = useQuery({
    queryKey: ["messages", activeConversation],
    queryFn: () => getMessages(activeConversation!),
    enabled: !!activeConversation && isOpen,
    refetchInterval: 3000,
  });

  const sendMutation = useMutation({
    mutationFn: (content: string) => sendMessage(activeConversation!, content),
    onSuccess: () => {
      setMessageInput("");
      queryClient.invalidateQueries({ queryKey: ["messages", activeConversation] });
    },
  });

  const startSupportMutation = useMutation({
    mutationFn: () => createConversation("support"),
    onSuccess: (data) => {
      setActiveConversation(data.id);
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendMutation.mutate(messageInput);
  };

  if (!token) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <Button onClick={() => setIsOpen(true)} className="rounded-full h-14 w-14 shadow-lg">
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {isOpen && (
        <Card className="w-80 h-96 shadow-xl flex flex-col bg-background border-border">
          <CardHeader className="p-3 border-b flex flex-row justify-between items-center bg-primary text-primary-foreground rounded-t-lg">
            <CardTitle className="text-base">
              {activeConversation ? "Chat" : "Support"}
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-6 w-6 text-primary-foreground hover:bg-primary/80">
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
            {!activeConversation ? (
              <div className="p-4 flex-1">
                <h3 className="mb-4 font-semibold text-foreground">Conversations</h3>
                {conversations?.length === 0 ? (
                  <div className="text-center mt-10">
                    <p className="text-muted-foreground mb-4">No conversations yet.</p>
                    <Button onClick={() => startSupportMutation.mutate()}>Start Support Chat</Button>
                  </div>
                ) : (
                  <ScrollArea className="h-full">
                    {conversations?.map((conv: any) => (
                      <div
                        key={conv.id}
                        className="p-3 border-b cursor-pointer hover:bg-muted"
                        onClick={() => setActiveConversation(conv.id)}
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback><User className="h-4 w-4" /></AvatarFallback>
                          </Avatar>
                          <div className="flex-1 overflow-hidden">
                            <p className="font-medium truncate text-foreground">
                                {conv.participants.find((p: any) => p.id !== user.id)?.name || "User"}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {conv.messages[0]?.content || "No messages"}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                )}
              </div>
            ) : (
              <>
                <div className="p-2 border-b bg-muted/50">
                    <Button variant="ghost" size="sm" onClick={() => setActiveConversation(null)}>Back</Button>
                </div>
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages?.map((msg: any) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === user.id ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] p-2 rounded-lg ${
                            msg.senderId === user.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-foreground"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                          <span className="text-[10px] opacity-70 block text-right mt-1">
                            {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div ref={scrollRef} />
                  </div>
                </ScrollArea>
                <form onSubmit={handleSend} className="p-3 border-t flex gap-2 bg-background">
                  <Input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1"
                  />
                  <Button type="submit" size="icon" disabled={sendMutation.isPending}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send } from "lucide-react"

export function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! I'm a support assistant. How can I help you today?", isUser: false },
    ])
    const [inputValue, setInputValue] = useState("")

    const toggleChat = () => setIsOpen(!isOpen)

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputValue.trim()) return

        // Add user message
        const userMsg = { id: Date.now(), text: inputValue, isUser: true }
        setMessages((prev) => [...prev, userMsg])
        setInputValue("")

        // Simulate response
        setTimeout(() => {
            const responseMsg = {
                id: Date.now() + 1,
                text: "Thank you for reaching out. A counselor will be with you shortly. If this is an emergency, please call 999 immediately.",
                isUser: false
            }
            setMessages((prev) => [...prev, responseMsg])
        }, 1000)
    }

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {isOpen ? (
                <Card className="w-80 sm:w-96 shadow-xl border-primary/20">
                    <CardHeader className="bg-primary text-primary-foreground p-4 rounded-t-lg flex flex-row items-center justify-between">
                        <CardTitle className="text-base flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            Live Support
                        </CardTitle>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20" onClick={toggleChat}>
                            <X className="h-5 w-5" />
                        </Button>
                    </CardHeader>
                    <CardContent className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-lg p-3 text-sm ${msg.isUser
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-background border shadow-sm"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                    <CardFooter className="p-3 border-t">
                        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                            <Input
                                placeholder="Type a message..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="submit" size="icon" disabled={!inputValue.trim()}>
                                <Send className="h-4 w-4" />
                            </Button>
                        </form>
                    </CardFooter>
                </Card>
            ) : (
                <Button
                    size="lg"
                    className="h-14 w-14 rounded-full shadow-lg animate-bounce hover:animate-none"
                    onClick={toggleChat}
                >
                    <MessageCircle className="h-8 w-8" />
                    <span className="sr-only">Open Support Chat</span>
                </Button>
            )}
        </div>
    )
}

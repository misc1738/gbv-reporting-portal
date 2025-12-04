"use client"

import * as React from "react"
import { Mic, MicOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface VoiceInputProps extends React.ComponentProps<typeof Textarea> {
    // Removed unused onTranscript
}

export function VoiceInput({ className, value, onChange, ...props }: VoiceInputProps) {
    const [isListening, setIsListening] = React.useState(false)
    const [isSupported, setIsSupported] = React.useState(false)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recognitionRef = React.useRef<any>(null)

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
            if (SpeechRecognition) {
                setIsSupported(true)
                recognitionRef.current = new SpeechRecognition()
                recognitionRef.current.continuous = true
                recognitionRef.current.interimResults = true
                recognitionRef.current.lang = "en-US" // Default to English, could be dynamic

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recognitionRef.current.onresult = (event: any) => {
                    let finalTranscript = ""
                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            finalTranscript += event.results[i][0].transcript + " "
                        }
                    }

                    if (finalTranscript) {
                        // Append to existing value
                        const newValue = (value ? String(value) + " " : "") + finalTranscript

                        // Trigger native change event for React Hook Form compatibility
                        const nativeEvent = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value")?.set
                        const textarea = document.getElementById(props.id || "voice-textarea") as HTMLTextAreaElement

                        if (textarea && nativeEvent) {
                            nativeEvent.call(textarea, newValue)
                            textarea.dispatchEvent(new Event("input", { bubbles: true }))
                        }
                    }
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error)
                    setIsListening(false)
                }

                recognitionRef.current.onend = () => {
                    setIsListening(false)
                }
            }
        }
    }, [value, onChange, props.id])

    const toggleListening = () => {
        if (!isSupported || !recognitionRef.current) return

        if (isListening) {
            recognitionRef.current.stop()
            setIsListening(false)
        } else {
            recognitionRef.current.start()
            setIsListening(true)
        }
    }

    if (!isSupported) {
        return <Textarea className={className} value={value} onChange={onChange} {...props} />
    }

    return (
        <div className="relative">
            <Textarea
                className={cn("pr-12", className)}
                value={value}
                onChange={onChange}
                id={props.id || "voice-textarea"}
                {...props}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                    "absolute right-2 top-2 h-8 w-8 transition-colors",
                    isListening ? "text-red-500 hover:text-red-600 hover:bg-red-50" : "text-muted-foreground hover:text-foreground"
                )}
                onClick={toggleListening}
                title={isListening ? "Stop recording" : "Start voice recording"}
            >
                {isListening ? (
                    <MicOff className="h-4 w-4 animate-pulse" />
                ) : (
                    <Mic className="h-4 w-4" />
                )}
            </Button>
        </div>
    )
}

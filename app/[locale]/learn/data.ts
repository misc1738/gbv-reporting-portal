import { Scale, Shield, Heart, Users, Briefcase, Lock } from "lucide-react"
import React from "react"

export interface Lesson {
    id: string
    title: string
    content: string
    duration: string
    completed?: boolean
}

export interface Module {
    id: string
    title: string
    description: string
    icon: React.ElementType
    color: string
    bgColor: string
    lessons: Lesson[]
}

export const modulesData: Module[] = [
    {
        id: "rights",
        title: "Know Your Rights",
        description: "Understanding legal protections against GBV in Kenya.",
        icon: Scale,
        color: "text-blue-500",
        bgColor: "bg-blue-500/10",
        lessons: [
            {
                id: "l1",
                title: "The Sexual Offences Act (2006)",
                content: "The Sexual Offences Act is the primary law governing sexual violence in Kenya. It criminalizes rape, defilement (sex with a minor), sexual harassment, and other offences. \n\n**Key Provisions:**\n- **Minimum Sentences:** Mandatory minimum sentences for offenders, including life imprisonment for defilement of children under 11.\n- **Sexual Offenders Register:** Convicted offenders are placed on a national register.\n- **Protection of Victims:** The law prohibits the publication of the victim's identity.",
                duration: "5 min",
                completed: true
            },
            {
                id: "l2",
                title: "Protection Against Domestic Violence Act (2015)",
                content: "This Act provides comprehensive protection for victims of domestic violence. It defines domestic violence broadly to include physical, emotional, economic, and verbal abuse.\n\n**Functional Steps:**\n1. **Protection Orders:** You can apply to the court for a protection order to stop the abuser from contacting you or entering your home.\n2. **Police Duties:** Police officers are legally obligated to assist victims, including providing transport to a hospital or shelter.\n3. **Free Legal Aid:** Victims are entitled to legal aid if they cannot afford a lawyer.",
                duration: "8 min",
                completed: true
            },
            {
                id: "l3",
                title: "How to Report an Incident",
                content: "Reporting is crucial for justice and safety. \n\n**Step-by-Step Guide:**\n1. **Go to the Police:** Visit the nearest station, preferably the Gender Desk.\n2. **Get an OB Number:** Ensure your report is recorded in the Occurrence Book (OB) and you are given the OB number (e.g., OB 12/04/12/2023).\n3. **P3 Form:** Request a P3 form for medical examination. This must be filled by a doctor to be used as evidence.\n4. **Do Not Wash:** If sexual assault occurred, do not bathe or wash clothes before the medical exam to preserve DNA evidence.",
                duration: "6 min",
                completed: false
            },
            {
                id: "l4",
                title: "Accessing Free Legal Aid",
                content: "You do not have to face the legal system alone. Several organizations provide free legal representation.\n\n**Resources:**\n- **FIDA Kenya:** Specializes in women's rights. Call: 0800 720 501 (Toll-free).\n- **Kituo Cha Sheria:** Provides legal aid to the poor and marginalized. Call: 0734 874 221.\n- **National Legal Aid Service:** Government body offering legal assistance.",
                duration: "4 min",
                completed: false
            },
            {
                id: "l5",
                title: "Rights of a Survivor",
                content: "As a survivor of GBV, the Constitution of Kenya guarantees you specific rights:\n- **Dignity:** To be treated with respect and sensitivity.\n- **Privacy:** Your identity and personal information must be kept confidential.\n- **Healthcare:** Right to emergency medical treatment.\n- **Information:** Right to be informed about the progress of your case.",
                duration: "7 min",
                completed: false
            },
            {
                id: "l6",
                title: "The Court Process Explained",
                content: "Understanding the court process can reduce anxiety.\n\n**Stages:**\n1. **Plea Taking:** The accused is charged and pleads guilty or not guilty.\n2. **Hearing:** Witnesses (including you) testify. You can request to testify via video link or in a closed court for safety.\n3. **Judgment:** The magistrate/judge decides if the accused is guilty.\n4. **Sentencing:** If guilty, the punishment is delivered.",
                duration: "10 min",
                completed: false
            },
        ],
    },
    {
        id: "safety",
        title: "Safety Planning",
        description: "Practical steps to ensure your safety in dangerous situations.",
        icon: Shield,
        color: "text-red-500",
        bgColor: "bg-red-500/10",
        lessons: [
            {
                id: "s1",
                title: "Recognizing Warning Signs",
                content: "Early intervention can prevent escalation. \n\n**Red Flags:**\n- **Isolation:** Keeping you away from friends/family.\n- **Control:** Monitoring your phone, money, or movements.\n- **Threats:** Threatening to hurt you, children, or pets.\n- **Jealousy:** Excessive and irrational jealousy.\n\nIf you see these signs, start planning for your safety.",
                duration: "5 min",
                completed: true
            },
            {
                id: "s2",
                title: "Creating a Personal Safety Plan",
                content: "A safety plan is a personalized strategy to keep you safe.\n\n**Checklist:**\n- **Safe Place:** Identify a friend's house or shelter where you can go.\n- **Code Word:** Agree on a code word with trusted friends to signal you need help.\n- **Go Bag:** Pack a bag with ID, money, keys, medicines, and clothes. Hide it or leave it with a trusted person.\n- **Transport:** Know how you will get there (taxi money, friend's car).",
                duration: "10 min",
                completed: false
            },
            {
                id: "s3",
                title: "Emergency Contacts List",
                content: "Keep these numbers accessible (speed dial or hidden in your phone):\n- **Police:** 999 or 112\n- **GBV Helpline:** +254 711 226 8924 (Free, 24/7)\n- **Childline:** 116\n- **Trusted Friend/Family Member",
                duration: "3 min",
                completed: false
            },
            {
                id: "s4",
                title: "Digital Safety & Privacy",
                content: "Abusers often use technology to stalk or control.\n\n**Tips:**\n- **Passwords:** Change passwords for email, banking, and social media. Use 2FA.\n- **Location:** Turn off location sharing on your phone.\n- **History:** Clear browsing history or use Incognito mode.\n- **Social Media:** Review privacy settings and block the abuser.",
                duration: "7 min",
                completed: false
            },
            {
                id: "s5",
                title: "Safety in Public Spaces",
                content: "Stay safe when commuting or walking.\n- **Awareness:** Avoid distractions (phones, headphones) in isolated areas.\n- **Lighting:** Stick to well-lit, busy streets.\n- **Share Ride:** Share your live location with a friend when taking a taxi.\n- **Trust Instincts:** If something feels wrong, leave immediately.",
                duration: "6 min",
                completed: false
            },
            {
                id: "s6",
                title: "Protecting Children",
                content: "If children are involved:\n- **Teach Them:** How to call 999.\n- **Safe Room:** Identify a room with a lock where they can hide.\n- **Reassurance:** Tell them violence is not their fault.\n- **Custody:** Seek legal advice on emergency custody orders.",
                duration: "8 min",
                completed: false
            },
        ],
    },
    {
        id: "healing",
        title: "Healing & Recovery",
        description: "Resources for psychological and emotional well-being.",
        icon: Heart,
        color: "text-rose-500",
        bgColor: "bg-rose-500/10",
        lessons: [
            {
                id: "h1",
                title: "Understanding Trauma",
                content: "Trauma is an emotional response to a terrible event. \n\n**Common Symptoms:**\n- Flashbacks or nightmares.\n- Severe anxiety or fear.\n- Numbness or detachment.\n- Difficulty sleeping or concentrating.\n\nRemember: These are normal reactions to abnormal events. You are not 'crazy'.",
                duration: "6 min",
                completed: false
            },
            {
                id: "h2",
                title: "Self-Care Practices",
                content: "Small acts of self-care aid recovery.\n- **Physical:** Sleep, eat nutritious food, move your body.\n- **Emotional:** Journaling, art, crying (it releases stress hormones).\n- **Social:** Connect with safe people, set boundaries.\n- **Spiritual:** Meditation, prayer, or nature walks.",
                duration: "5 min",
                completed: false
            },
            {
                id: "h3",
                title: "Finding a Support Group",
                content: "You are not alone. Support groups offer a safe space to share and learn from others.\n\n**Where to find them:**\n- **Hospitals:** Many have GBV support centers.\n- **NGOs:** Organizations like Wangu Kanja Foundation run survivor groups.\n- **Online:** Verified online communities (ensure anonymity).",
                duration: "4 min",
                completed: false
            },
            {
                id: "h4",
                title: "Professional Counseling",
                content: "Therapy is highly recommended for processing trauma.\n- **Trauma-Informed Care:** Look for therapists trained in GBV/trauma.\n- **Free Services:** Call +254 711 226 8924 for referrals to free counseling centers.\n- **Types:** CBT (Cognitive Behavioral Therapy) and EMDR are effective for trauma.",
                duration: "5 min",
                completed: false
            },
            {
                id: "h5",
                title: "Healthy Coping Mechanisms",
                content: "Replace harmful coping (alcohol, isolation) with healthy ones.\n- **Grounding:** 5-4-3-2-1 technique (5 things you see, 4 touch, etc.) for anxiety.\n- **Expression:** Write, draw, or dance to release pent-up emotion.\n- **Routine:** Establish a daily routine to regain a sense of control.",
                duration: "7 min",
                completed: false
            },
            {
                id: "h6",
                title: "Rebuilding Trust & Relationships",
                content: "Trauma can impact how you relate to others.\n- **Patience:** Take it slow. Trust is earned, not given.\n- **Boundaries:** It's okay to say 'No'. Set clear limits on what you accept.\n- **Communication:** Express your needs clearly to supportive friends/partners.",
                duration: "9 min",
                completed: false
            },
        ],
    },
    {
        id: "digital",
        title: "Digital Security",
        description: "Protecting your online presence and communications.",
        icon: Lock,
        color: "text-purple-500",
        bgColor: "bg-purple-500/10",
        lessons: [
            {
                id: "d1",
                title: "Secure Communication Tools",
                content: "Use tools designed for privacy.\n- **Signal:** The gold standard for encrypted messaging.\n- **WhatsApp:** Use 'Disappearing Messages' for sensitive chats.\n- **ProtonMail:** For encrypted emails.\n- **Burner Phones:** Cheap, prepaid phones for emergency use only.",
                duration: "5 min",
                completed: false
            },
            {
                id: "d2",
                title: "Social Media Privacy Audit",
                content: "Lock down your profiles.\n- **Facebook:** Set posts to 'Friends Only'. Hide friend lists.\n- **Instagram:** Switch to a Private Account. Turn off 'Activity Status'.\n- **Twitter/X:** Protect your tweets. Disable location tagging.\n- **Blocking:** Don't hesitate to block and report abusive accounts.",
                duration: "7 min",
                completed: false
            },
            {
                id: "d3",
                title: "Securing Your Devices",
                content: "Your phone is a gateway to your life.\n- **Lock Screen:** Use a strong PIN (6 digits) or biometrics.\n- **Updates:** Keep OS and apps updated to patch security holes.\n- **Antivirus:** Install reputable mobile security apps (e.g., Malwarebytes).\n- **Find My Device:** Enable this to wipe data remotely if stolen.",
                duration: "6 min",
                completed: false
            },
            {
                id: "d4",
                title: "Dealing with Online Harassment",
                content: "If you are targeted:\n1. **Do Not Engage:** Trolls want a reaction. Don't give it to them.\n2. **Mute/Block:** Use platform tools to silence them immediately.\n3. **Report:** Report every abusive post to the platform.\n4. **Support:** Tell a friend. Online abuse takes a real mental toll.",
                duration: "8 min",
                completed: false
            },
            {
                id: "d5",
                title: "Collecting Digital Evidence",
                content: "Evidence is key for prosecution.\n- **Screenshots:** Capture the post/message, profile URL, date, and time.\n- **Do Not Delete:** Keep the original messages if safe to do so.\n- **Backup:** Upload screenshots to a secure cloud (Google Drive/Dropbox) separate from your phone.\n- **Notarize:** In some cases, a lawyer can certify digital evidence.",
                duration: "10 min",
                completed: false
            },
            {
                id: "d6",
                title: "Protection Against Cyberstalking",
                content: "Signs of spyware/stalkerware:\n- Battery draining fast.\n- Phone heating up.\n- Strange noises on calls.\n\n**Action:**\n- **Factory Reset:** The most effective way to remove spyware (backup photos/contacts first).\n- **New Accounts:** Create new email/social accounts from a safe device.",
                duration: "7 min",
                completed: false
            },
        ],
    },
    {
        id: "bystander",
        title: "Bystander Intervention",
        description: "How to safely intervene and support others.",
        icon: Users,
        color: "text-green-500",
        bgColor: "bg-green-500/10",
        lessons: [
            {
                id: "b1",
                title: "The 5 Ds of Intervention",
                content: "Safe ways to step in:\n1. **Distract:** Ask for time/directions to interrupt the situation.\n2. **Delegate:** Ask someone else (security, manager) to help.\n3. **Document:** Record video (safely) if it helps the victim later.\n4. **Delay:** Check on the victim after the incident.\n5. **Direct:** Speak up directly (e.g., 'That's not okay') ONLY if safe.",
                duration: "8 min",
                completed: false
            },
            {
                id: "b2",
                title: "How to Support a Survivor",
                content: "If someone discloses to you:\n- **Listen:** 'I believe you.' 'It's not your fault.'\n- **Validate:** Don't minimize their pain.\n- **Ask:** 'How can I support you?' (Don't take over).\n- **Resources:** Offer numbers like +254 711 226 8924, but let them decide when to call.",
                duration: "6 min",
                completed: false
            },
            {
                id: "b3",
                title: "Reporting as a Witness",
                content: "You can report crimes you witness.\n- **Emergency:** Call 999 if violence is happening now.\n- **Anonymous:** Use Crime Stoppers or the anonymous reporting feature on this portal.\n- **Statement:** Be prepared to write a statement if you report to police.",
                duration: "5 min",
                completed: false
            },
            {
                id: "b4",
                title: "Building Safe Communities",
                content: "Prevention starts with culture.\n- **Call Out:** Challenge sexist jokes or victim-blaming comments.\n- **Educate:** Share resources and knowledge about GBV.\n- **Support:** Volunteer or donate to local shelters and rights groups.",
                duration: "7 min",
                completed: false
            },
        ],
    },
    {
        id: "workplace",
        title: "Workplace Safety",
        description: "Addressing harassment and discrimination at work.",
        icon: Briefcase,
        color: "text-amber-500",
        bgColor: "bg-amber-500/10",
        lessons: [
            {
                id: "w1",
                title: "Defining Workplace Harassment",
                content: "It's not just 'office banter'.\n- **Sexual Harassment:** Unwanted touching, sexual comments, requests for favors.\n- **Quid Pro Quo:** 'Sleep with me to get a promotion'.\n- **Hostile Environment:** Jokes, pictures, or comments that make work unbearable.",
                duration: "6 min",
                completed: false
            },
            {
                id: "w2",
                title: "Reporting Channels at Work",
                content: "Know your policy.\n1. **Internal:** Report to HR, your supervisor, or a designated 'Gender Officer'.\n2. **Written:** Submit complaints in writing and keep a copy.\n3. **External:** If internal fails, report to the Ministry of Labour or FIDA.",
                duration: "5 min",
                completed: false
            },
            {
                id: "w3",
                title: "Employee Rights & Protections",
                content: "The Employment Act (2007) protects you.\n- **Right to Fair Treatment:** Harassment is a form of discrimination.\n- **No Retaliation:** It is illegal to fire or punish you for reporting harassment.\n- **Constructive Dismissal:** If you are forced to quit due to harassment, you can sue for damages.",
                duration: "7 min",
                completed: false
            },
            {
                id: "w4",
                title: "Creating a Supportive Culture",
                content: "For employers and colleagues:\n- **Zero Tolerance:** Clear policies with consequences.\n- **Training:** Regular workshops on respect and boundaries.\n- **Believe Victims:** Take all complaints seriously and investigate impartially.",
                duration: "8 min",
                completed: false
            },
        ],
    },
]

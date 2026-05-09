const input = document.getElementById("command-input");
const output = document.getElementById("output");
const terminal = document.getElementById("terminal");

let history = [];
let histIndex = -1;

const commands = {
    help: () => {
        return [
            "Available commands:",
            "- about      : Professional overview",
            "- experience : Work history summary",
            "- projects   : Key infrastructure projects",
            "- skills     : Technical stack",
            "- tools      : Tools & technologies",
            "- achievements : Key wins",
            "- certs      : Certifications",
            "- contact    : Contact information",
            "- github     : GitHub profile",
            "- linkedin   : LinkedIn profile",
            "- clear      : Clear terminal",
            "- help       : This help text"
        ];
    },

    about: () => "Systems Administrator with 3+ years in K-12 IT infrastructure. Specialized in Active Directory, device management at scale, and network operations.",

    experience: () => [
        "Mayflower School District (Aug. 2023 – Sep. 2025)",
        "",
        "Key responsibilities:",
        "- Managed AD infrastructure for 2,000+ users",
        "- Intune/MECM device management (500+ devices)",
        "- VLAN design & network segmentation",
        "- Helpdesk ticket response optimization",
        "- Google Workspace administration"
    ],

    projects: () => [
        "Infrastructure Projects:",
        "",
        "1. Network Overhaul",
        "   - VLAN segmentation across district",
        "   - Aruba switch configuration & optimization",
        "   - Access point deployment",
        "",
        "2. Device Management Automation",
        "   - HallPass provisioning script",
        "   - Intune compliance policy deployment",
        "",
        "3. Active Directory Restructuring",
        "   - OU optimization for GPO management",
        "   - Security group standardization"
    ],

    skills: () => "Windows Server | AD | Group Policy | PowerShell | Intune | MECM | Azure AD | Microsoft 365 | DNS/DHCP | VLANs | Aruba Networking",

    tools: () => [
        "Tools & Technologies:",
        "- Active Directory | Group Policy | PowerShell",
        "- Windows Server 2019/2022",
        "- Intune | MECM (ConfigMgr)",
        "- Microsoft 365 | Exchange Online | Teams",
        "- Azure AD | Conditional Access",
        "- Networking: Aruba Switches, DNS, DHCP, VLANs",
        "- Google Workspace | Chromebook Management",
        "- Ticketing & Monitoring systems"
    ],

    achievements: () => [
        "Key Achievements:",
        "",
        "- Deployed 500+ device VLAN segmentation without downtime",
        "- Reduced helpdesk ticket response time by 35%",
        "- Automated HallPass provisioning (saved ~8 hrs/month)",
        "- Managed 2,000+ Google Workspace accounts",
        "- Optimized network infrastructure for 95% uptime"
    ],

    certs: () => [
        "Certifications & Goals:",
        "- CompTIA Security+ (In Progress)",
        "- Microsoft Certified: Windows Server Hybrid Administrator (Target)",
        "- CompTIA Network+ (Planned)"
    ],

    github: () => [
        "GitHub: https://github.com/yourusername",
        "",
        "Recent repositories:",
        "- HallPass-Automation: PowerShell deployment scripts",
        "- Network-Audit: Aruba switch configuration",
        "- Active-Directory-Automation: AD management scripts"
    ],

    linkedin: () => "LinkedIn: https://linkedin.com/in/calebs-code",

    contact: () => [
        "Contact Information:",
        "",
        "Email: calebs.code1@gmail.com",
        "LinkedIn: https://linkedin.com/in/calebs-code",
        "GitHub: https://github.com/yourusername"
    ]
};

function printLine(text, cls = "") {
    const div = document.createElement("div");
    div.classList.add("output-line");
    if (cls) div.classList.add(cls);
    div.textContent = text;
    output.appendChild(div);
    output.scrollTop = output.scrollHeight;
}

function printAnimated(text, cls = "", speed = 5) {
    const div = document.createElement("div");
    div.classList.add("output-line");
    if (cls) div.classList.add(cls);
    output.appendChild(div);

    let i = 0;
    const step = () => {
        div.textContent += text.charAt(i);
        i++;
        output.scrollTop = output.scrollHeight;
        if (i < text.length) {
            setTimeout(step, speed);
        }
    };
    step();
}

function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    printLine(`PS C:\\Users\\caleb> ${cmd}`, "cmd");

    history.push(cmd);
    histIndex = history.length;

    if (cmd === "clear") {
        output.innerHTML = "";
        return;
    }

    const fn = commands[cmd];
    if (fn) {
        const res = fn();
        if (Array.isArray(res)) {
            res.forEach((line, idx) => {
                setTimeout(() => printAnimated(line, "info"), idx * 25);
            });
        } else {
            setTimeout(() => printAnimated(res, "info"), 50);
        }
    } else {
        printLine(`'${cmd}' is not recognized. Type 'help' for available commands.`, "error");
    }
}

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        runCommand(input.value);
        input.value = "";
    } else if (e.key === "ArrowUp") {
        if (history.length === 0) return;
        if (histIndex > 0) histIndex--;
        input.value = history[histIndex] || "";
        e.preventDefault();
    } else if (e.key === "ArrowDown") {
        if (history.length === 0) return;
        if (histIndex < history.length - 1) histIndex++;
        else { histIndex = history.length; input.value = ""; return; }
        input.value = history[histIndex] || "";
        e.preventDefault();
    } else if (e.key === "Tab") {
        e.preventDefault();
        const cur = input.value.trim().toLowerCase();
        const keys = Object.keys(commands).filter(k => k.startsWith(cur));
        if (keys.length === 1) {
            input.value = keys[0] + " ";
        } else if (keys.length > 1) {
            printLine(keys.join("    "), "info");
        }
    }
});

terminal.addEventListener("click", () => input.focus());

printAnimated("Systems Lab - Interactive Terminal", "info", 5);
setTimeout(() => printAnimated("Type 'help' to explore infrastructure knowledge.", "info", 5), 400);
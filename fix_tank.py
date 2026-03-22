#!/usr/bin/env python3
with open("src/components/Tank.tsx", "r", encoding="utf-8") as f:
    lines = f.readlines()

new_lines = []
i = 0
while i < len(lines):
    if i == 247:  # Line 248 (0-indexed)
        new_lines.append(
            '          <div className="relative z-10 flex justify-between items-start mb-3">\n'
        )
        new_lines.append(
            "            <ComfortMeter creatureCount={swimmingCreatures.length} />\n"
        )
        new_lines.append("            <button\n")
        new_lines.append("              onClick={handleReset}\n")
        new_lines.append(
            '              className="bg-white/10 hover:bg-white/20 text-cyan-100 \n'
        )
        new_lines.append(
            "                       rounded-lg py-2 px-3 font-medium transition-all backdrop-blur-sm\n"
        )
        new_lines.append('                       border border-white/10 shadow"\n')
        new_lines.append("            >\n")
        new_lines.append("              重置\n")
        new_lines.append("            </button>\n")
        new_lines.append("            <OxygenMeter level={displayOxygen} />\n")
        new_lines.append("          </div>\n")
        i = 260
    else:
        new_lines.append(lines[i])
        i += 1

with open("src/components/Tank.tsx", "w", encoding="utf-8") as f:
    f.writelines(new_lines)

print("Done")

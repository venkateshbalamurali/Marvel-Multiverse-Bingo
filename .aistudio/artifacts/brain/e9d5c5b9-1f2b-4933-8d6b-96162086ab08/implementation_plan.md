# Zero-Attempts Accuracy Logic Specification

Update the tactical accuracy calculation logic across all client components and backend export endpoints so that any player who has made zero attempts displays an accuracy of **0%** rather than defaulting to 100%.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following user preferences were confirmed in the interactive clarification phase:
> - **Screen Display (0 Attempts)**: When a player has made 0 attempts, accuracy displays cleanly as **`0%`** across both the Host Leaderboard audit table and the Player Personal Mission Debrief HUD.
> - **CSV Audit Export (0 Attempts)**: In downloadable CSV audit files (both client-side and server-side), accuracy for 0 attempts is formatted as **`0.0%`**.

---

## 1. Overview & Core Concept

- **Problem**: Previously, when `totalTaps === 0`, accuracy fell back to `'100%'` or `'100.0%'` to prevent division-by-zero (`0 / 0`). However, mathematically and semantically in the context of the game, a participant who took no actions has solved 0 questions and achieved 0% accuracy.
- **Solution**: Enforce strict conditional calculation:
  - If `totalAttempts > 0`: `((correctAttempts / totalAttempts) * 100)`
  - If `totalAttempts === 0`: `0%` (or `0.0%` for decimal precision in CSV exports).

---

## 2. User Experience & Visual Design

### A. Host Leaderboard Table
- In the **Ranked Participant Performance Audit** table:
  - Players with $\ge 1$ attempts continue showing their actual ratio (e.g., `85%`, `100%`, `50%`).
  - Players who joined the room but never clicked any tiles show `0%` inside the accuracy column.

### B. Player Personal Mission Debrief HUD
- On the player's private debrief screen:
  - Under the **ACCURACY** card, players with zero attempts see:
    - Main figure: **`0%`**
    - Subtext: **`0 Correct / 0 Attempts`**

### C. CSV Audit Exports
- Both the client-side CSV generator (`LeaderboardReport.tsx`) and the server fallback route (`server.ts`):
  - Column `Accuracy %` output: **`0.0%`** when attempts = 0.

---

## 3. Technical Architecture & File Modifications

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ACCURACY ENGINE UPDATE                          │
│                                                                        │
│   totalAttempts = totalAttempts || (correctTaps + wrongTaps)           │
│   accuracy = totalAttempts > 0                                         │
│              ? ((correctTaps / totalAttempts) * 100)                   │
│              : 0                                                       │
└──────────────────┬──────────────────┬─────────────────┬────────────────┘
                   │                  │                 │
                   ▼                  ▼                 ▼
          Host Leaderboard      Player Debrief      CSV Exports
          (table: '0%')         (HUD: '0%')         (exports: '0.0%')
```

### Affected Files
1. **`src/components/LeaderboardReport.tsx`**:
   - Line 65: Update client CSV export fallback from `'100.0'` to `'0.0'`.
   - Line 256: Update leaderboard table accuracy fallback from `'100'` to `'0'`.
2. **`src/components/PlayerBoard.tsx`**:
   - Line 867: Update player debrief accuracy fallback from `'100'` to `'0'`.
3. **`server.ts`**:
   - Line 903: Update server CSV route fallback from `'100.0'` to `'0.0'`.

---

## 4. Verification Plan
- **Verification Tools**: Run `compile_applet` and `lint_applet` to ensure TypeScript types and compilation succeed without errors.
- **Functional Check**: Verify the accuracy formulas in all 4 locations return `'0'` or `'0.0'` when `totalAttempts === 0`.

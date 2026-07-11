import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BadgeCheck, BarChart3, ChevronDown, Crown, Sparkles, Trophy, Users2 } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Shared tilt hook — same physics as navbar/footer/OurPlans          */
/* ------------------------------------------------------------------ */
const useTilt = (strength = 8) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [strength, -strength]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-strength, strength]), {
    stiffness: 260,
    damping: 22,
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave };
};

const roadToGloryMonths = [
  { month: 'January', theme: 'Ignite', icon: Sparkles, event: 'Corporate Marathon', sponsor: 'Performance Apparel', badge: 'Launch Badge' },
  { month: 'February', theme: 'Compete', icon: Trophy, event: 'Corporate Cricket Cup', sponsor: 'Sports Gear', badge: 'Rising Momentum' },
  { month: 'March', theme: 'Precision', icon: BarChart3, event: 'Corporate Badminton Masters', sponsor: 'Wellness Partners', badge: 'Precision Master' },
  { month: 'April', theme: 'Strategy', icon: Users2, event: 'Corporate Table Tennis League', sponsor: 'Lifestyle Brand', badge: 'Strategy Edge' },
  { month: 'May', theme: 'Wellness', icon: BadgeCheck, event: 'Corporate Fitness Challenge', sponsor: 'Health Alliance', badge: 'Wellness Warrior' },
  { month: 'June', theme: 'Momentum', icon: Trophy, event: 'Corporate Pickleball Open', sponsor: 'Community Partners', badge: 'Momentum Builder' },
  { month: 'July', theme: 'Unity', icon: Users2, event: 'Corporate Indoor Games', sponsor: 'Culture Sponsors', badge: 'Team Builder' },
  { month: 'August', theme: 'Spirit', icon: Sparkles, event: 'Independence Sports Festival', sponsor: 'National Partners', badge: 'Spirit Champion' },
  { month: 'September', theme: 'Strength', icon: Trophy, event: 'Corporate Football Cup', sponsor: 'Performance Partners', badge: 'Game Changer' },
  { month: 'October', theme: 'Celebrate', icon: BadgeCheck, event: 'Festival Sports Carnival', sponsor: 'Festival Sponsors', badge: 'Culture Builder' },
  { month: 'November', theme: 'Championship', icon: Crown, event: 'Corporate Sports Week', sponsor: 'Leadership Sponsors', badge: 'Elite Performer' },
  { month: 'December', theme: 'Legacy', icon: Crown, event: 'Corporate Grand Finale', sponsor: 'Annual Partners', badge: 'Legend' },
];

const rankingCriteria = [
  { label: 'Participation', value: '40%' },
  { label: 'Performance', value: '30%' },
  { label: 'Consistency', value: '15%' },
  { label: 'Sportsmanship', value: '10%' },
  { label: 'Community Engagement', value: '5%' },
];

const leaderboardData = [
  { rank: 1, name: 'TechNova Solutions', xp: '24,850 XP', level: 'Level 10', badges: '18', movement: '▲ +3', profile: 'View Profile' },
  { rank: 2, name: 'Skyline Innovations', xp: '23,740 XP', level: 'Level 10', badges: '17', movement: '▲ +1', profile: 'View Profile' },
  { rank: 3, name: 'Quantum Dynamics', xp: '22,980 XP', level: 'Level 9', badges: '16', movement: '—', profile: 'View Profile' },
  { rank: 4, name: 'Vertex Technologies', xp: '21,860 XP', level: 'Level 9', badges: '15', movement: '▼ -1', profile: 'View Profile' },
  { rank: 5, name: 'Fusion Enterprises', xp: '20,940 XP', level: 'Level 8', badges: '14', movement: '▲ +2', profile: 'View Profile' },
  { rank: 6, name: 'Pinnacle Industries', xp: '19,830 XP', level: 'Level 8', badges: '13', movement: '▼ -2', profile: 'View Profile' },
  { rank: 7, name: 'NovaEdge Corp', xp: '18,920 XP', level: 'Level 7', badges: '12', movement: '▲ +4', profile: 'View Profile' },
  { rank: 8, name: 'Elevate Systems', xp: '17,610 XP', level: 'Level 7', badges: '11', movement: '—', profile: 'View Profile' },
  { rank: 9, name: 'Zenith Global', xp: '16,740 XP', level: 'Level 6', badges: '10', movement: '▲ +1', profile: 'View Profile' },
  { rank: 10, name: 'Horizon Digital', xp: '15,980 XP', level: 'Level 6', badges: '9', movement: '▼ -3', profile: 'View Profile' },
];

const xpRules = [
  'Event Participation', 'Team Registration', 'Match Victory', 'Tournament Winner', 'Runner Up',
  'Fair Play Award', 'Best Team Spirit', 'Attendance', 'Volunteer Participation', 'Special Recognition',
];

const badges = ['Early Challenger', 'Team Performer', 'Precision Master', 'Strategic Thinker', 'Wellness Warrior', 'Momentum Builder', 'Team Builder', 'Spirit Champion', 'Game Changer', 'Culture Builder', 'Elite Performer', 'Legend'];

const timelineSteps = ['Join HAKIRUSH', 'Receive Team Jerseys', 'Participate in Monthly Experiences', 'Earn Experience Points (XP)', 'Unlock Achievement Badges', 'Improve HAKI RANK', 'Represent Your Organization', 'Become Annual Champions'];

/* ------------------------------------------------------------------ */
/*  3D MONTH CARD — tilts toward cursor, icon badge pops forward       */
/* ------------------------------------------------------------------ */
const MonthCard3D = ({ item, index }) => {
  const { ref, x, y, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(7);
  const Icon = item.icon;

  const glow = useTransform([x, y], ([xv, yv]) =>
    `radial-gradient(circle at ${(xv + 0.5) * 100}% ${(yv + 0.5) * 100}%, rgba(229,9,20,0.2), transparent 60%)`
  );

  return (
    <div style={{ perspective: 900 }}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ y: isHovered ? -6 : 0 }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="group relative h-full rounded-[20px] border border-white/10 bg-[#111111]/95 p-4 shadow-[0_12px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl transition-colors duration-300 hover:border-[#E50914]/35 hover:bg-[#151515] overflow-hidden"
      >
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit]"
          style={{ background: glow, opacity: isHovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />

        <div className="relative flex items-center justify-between gap-3" style={{ transform: 'translateZ(10px)' }}>
          <div className="rounded-full bg-[#E50914]/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#E50914]">{item.month}</div>
          <div className="text-xs font-medium text-[#A8A8A8]">{item.theme}</div>
        </div>

        <div className="relative mt-4 rounded-[16px] border border-white/10 bg-gradient-to-br from-[#242424] via-[#161616] to-[#0D0D0D] p-3" style={{ transform: 'translateZ(6px)' }}>
          <div className="flex min-h-[112px] flex-col justify-between rounded-[14px] border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.18),transparent_55%)] p-3">
            <motion.div
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="inline-flex w-fit rounded-full bg-white/10 p-2 text-[#E50914]"
              style={{ transform: 'translateZ(28px)' }}
            >
              <Icon size={16} />
            </motion.div>
            <div style={{ transform: 'translateZ(18px)' }}>
              <div className="text-sm font-semibold text-white">{item.event}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-[#E50914]">{item.badge}</div>
            </div>
          </div>
        </div>

        <div className="relative mt-3 text-xs leading-5 text-[#A8A8A8]" style={{ transform: 'translateZ(6px)' }}>
          Sponsor: <span className="text-[#CFCFCF]">{item.sponsor}</span>
        </div>
      </motion.article>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  3D STEP CARD — lighter tilt for the journey steps grid             */
/* ------------------------------------------------------------------ */
const StepCard3D = ({ step, index }) => {
  const { ref, rotateX, rotateY, isHovered, setIsHovered, handleMouseMove, handleMouseLeave } = useTilt(6);

  return (
    <div style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{ y: isHovered ? -5 : 0 }}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="group rounded-[20px] border border-white/10 bg-[#0D0D0D]/80 p-5 transition-colors duration-300 hover:border-[#E50914]/35"
      >
        <div className="flex items-center justify-between" style={{ transform: 'translateZ(14px)' }}>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E50914]/15 text-sm font-semibold text-[#E50914]">
            {index + 1}
          </div>
          <div className="h-2 w-2 rounded-full bg-[#E50914]" />
        </div>
        <div className="mt-4 text-sm leading-7 text-[#CFCFCF]" style={{ transform: 'translateZ(10px)' }}>{step}</div>
      </motion.div>
    </div>
  );
};

const Impact = () => {
  const timelineRows = [roadToGloryMonths.slice(0, 6), roadToGloryMonths.slice(6)];

  return (
    <section className="relative overflow-hidden bg-transparent py-[120px] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(229,9,20,0.2),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.06),transparent_25%)]" />
      <div className="absolute left-1/2 top-16 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-[#E50914]/10 blur-[130px]" />
      <div className="section-shell relative">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E50914]/25 bg-[#E50914]/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">
              <span className="h-2 w-2 rounded-full bg-[#E50914]" />
              The Road to Glory
            </div>
            <h2 className="mt-6 text-4xl leading-[0.9] sm:text-5xl lg:text-6xl">
              A year of momentum, milestones and unforgettable experiences.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#CFCFCF]">
              Every great workplace is built through consistent engagement, shared experiences and meaningful recognition.
            </p>
          </div>

          <div className="grid gap-3 rounded-[24px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl sm:grid-cols-3">
            {[
              { value: '12', label: 'Monthly moments' },
              { value: '100%', label: 'Shared participation' },
              { value: '1', label: 'Annual champion' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-[18px] border border-white/10 bg-[#0D0D0D]/70 p-4">
                <div className="text-2xl font-semibold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-[#A8A8A8]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(229,9,20,0.06))] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">Journey Timeline</div>
              <h3 className="mt-2 text-3xl sm:text-4xl">A full-year path designed to build stronger teams.</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#CFCFCF]">Monthly experiences</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#CFCFCF]">Recognition moments</span>
            </div>
          </div>
          <div className="mt-12 space-y-5">
            {timelineRows.map((row, rowIndex) => (
              <div key={rowIndex} className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                {row.map((item, index) => (
                  <MonthCard3D key={item.month} item={item} index={index} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(229,9,20,0.08))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.22)] sm:p-8">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">How the journey unfolds</div>
                <h3 className="mt-2 text-2xl font-semibold text-white sm:text-3xl">A simple path from first join to annual recognition.</h3>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#CFCFCF]">
                Built for participation and growth
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {timelineSteps.map((step, index) => (
                <StepCard3D key={step} step={step} index={index} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-[32px] border border-white/10 bg-[#171717] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.25)] sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">HAKI RANK</div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl">HAKI RANK</h2>
            <p className="mt-4 text-lg leading-8 text-[#A8A8A8]">
              Recognizing organizations that consistently invest in employee engagement, teamwork, workplace wellness and sporting excellence.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#A8A8A8]">
              Every event contributes to your organization's overall standing. Whether you're a startup or an enterprise, every organization has an equal opportunity to improve its position through participation, teamwork, consistency and sportsmanship.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-6">
              <div className="mb-5 text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914]">Ranking Criteria</div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {rankingCriteria.map((item) => (
                  <div key={item.label} className="rounded-[16px] border border-white/10 bg-[#171717] p-4">
                    <div className="text-2xl font-semibold text-white">{item.value}</div>
                    <div className="mt-2 text-sm text-[#A8A8A8]">{item.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 overflow-hidden rounded-[20px] border border-white/10">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-[#171717] text-[#A8A8A8]">
                    <tr>
                      <th className="px-4 py-3">Rank</th>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Current XP</th>
                      <th className="px-4 py-3">Level</th>
                      <th className="px-4 py-3">Badges</th>
                      <th className="px-4 py-3">Movement</th>
                      <th className="px-4 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboardData.map((entry) => (
                      <tr key={entry.rank} className="border-t border-white/10 bg-[#0D0D0D]">
                        <td className="px-4 py-3 text-white">#{entry.rank}</td>
                        <td className="px-4 py-3 text-white">{entry.name}</td>
                        <td className="px-4 py-3 text-[#A8A8A8]">{entry.xp}</td>
                        <td className="px-4 py-3 text-[#A8A8A8]">{entry.level}</td>
                        <td className="px-4 py-3 text-[#A8A8A8]">{entry.badges}</td>
                        <td className="px-4 py-3 text-[#E50914]">{entry.movement}</td>
                        <td className="px-4 py-3 text-[#E50914]">{entry.profile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-6">
                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914]">Company Profile Preview</div>
                <div className="flex items-center gap-4 rounded-[16px] border border-white/10 bg-[#171717] p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#E50914]/15 text-[#E50914]">NL</div>
                  <div>
                    <div className="text-lg font-semibold text-white">Northstar Labs</div>
                    <div className="text-sm text-[#A8A8A8]">Rank #1 • 18,420 XP</div>
                  </div>
                </div>
                <div className="mt-4 space-y-3 text-sm text-[#A8A8A8]">
                  <div className="flex items-center justify-between"><span>Company Level</span><span className="text-white">Level 9</span></div>
                  <div className="flex items-center justify-between"><span>Participation</span><span className="text-white">94%</span></div>
                  <div className="flex items-center justify-between"><span>Events Completed</span><span className="text-white">32</span></div>
                  <div className="flex items-center justify-between"><span>Badges Earned</span><span className="text-white">12</span></div>
                  <div className="flex items-center justify-between"><span>Next Milestone</span><span className="text-white">Level 10</span></div>
                </div>
                <button className="mt-5 btn-primary">View Profile</button>
              </div>

              <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-6">
                <div className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914]">Achievement Badges</div>
                <div className="flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <span key={badge} className="rounded-full border border-white/10 bg-[#171717] px-3 py-2 text-xs text-[#A8A8A8]">{badge}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_0.85fr]">
            <div className="rounded-[24px] border border-white/10 bg-[#0D0D0D] p-6">
              <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914]">XP System</div>
              <div className="mt-4 text-sm leading-7 text-[#A8A8A8]">
                XP is designed to be backend configurable and awarded across participation, team registration, victories, fair play and recognition events. The rules below can be replaced with live service values at any time.
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {xpRules.map((rule) => (
                  <span key={rule} className="rounded-full border border-white/10 bg-[#171717] px-3 py-2 text-xs text-white">{rule}</span>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-[#E50914]/20 bg-[#171717] p-6">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#E50914]">Why HAKI RANK Matters</div>
              <p className="text-sm leading-7 text-[#A8A8A8]">
                Unlike traditional tournaments where only winners are recognized, HAKI RANK celebrates organizations that consistently invest in their people through continuous participation, teamwork and workplace engagement.
              </p>
              <div className="mt-6 rounded-[18px] border border-white/10 bg-[#0D0D0D] p-4 text-sm text-[#A8A8A8]">
                <div className="mb-2 font-semibold text-white">Every XP Represents</div>
                <div>Employee Participation • Team Collaboration • Workplace Wellness • Consistency • Sportsmanship • Organizational Growth</div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-6 rounded-[32px] border border-[#E50914]/25 bg-[linear-gradient(135deg,rgba(229,9,20,0.16),rgba(255,255,255,0.04))] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.25)] sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E50914]/25 bg-[#E50914]/10 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-[#E50914]">
                <span className="h-2 w-2 rounded-full bg-[#E50914]" />
                Ready to Climb HAKI RANK?
              </div>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Become a corporate member and turn every month into a shared celebration.
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-[#D1D1D1]">
                Create a culture of participation, celebration and recognition that lasts all year long.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="btn-primary">Become a Corporate Member</button>
              <button className="btn-secondary">Download Brochure</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;
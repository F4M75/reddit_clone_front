import {
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Share2,
  Bookmark,
  MoreHorizontal,
  Flame,
  Sparkles,
  TrendingUp,
  BarChart2,
  Home,
  Globe,
  Zap,
  Users,
  Plus,
  ImageIcon,
  Link as LinkIcon,
} from "lucide-react";
import { useUserStore } from "@/store/user.store";
import { useState } from "react";

const COMMUNITIES = [
  { name: "r/programming", color: "#ff4500", members: "5.2M", letter: "P" },
  { name: "r/webdev", color: "#0dd3bb", members: "1.8M", letter: "W" },
  { name: "r/reactjs", color: "#61dafb", members: "320K", letter: "R" },
  { name: "r/typescript", color: "#3178c6", members: "210K", letter: "T" },
  { name: "r/javascript", color: "#f7df1e", members: "2.1M", letter: "J" },
];

const MOCK_POSTS = [
  {
    id: 1,
    subreddit: "r/programming",
    subredditColor: "#ff4500",
    subredditLetter: "P",
    author: "u/dev_guru",
    time: "5h",
    votes: 24800,
    title:
      "I built a full-stack Reddit clone in a weekend using React and Go — here's what I learned",
    comments: 847,
    thumbnail: true,
    thumbnailColor: "#ff6534",
    flair: "Project",
  },
  {
    id: 2,
    subreddit: "r/webdev",
    subredditColor: "#0dd3bb",
    subredditLetter: "W",
    author: "u/css_wizard",
    time: "3h",
    votes: 12300,
    title:
      "CSS is getting really good — Subgrid, Container Queries, and :has() are game changers",
    comments: 312,
    thumbnail: true,
    thumbnailColor: "#0dd3bb",
    flair: "Discussion",
  },
  {
    id: 3,
    subreddit: "r/reactjs",
    subredditColor: "#61dafb",
    subredditLetter: "R",
    author: "u/hooks_fan",
    time: "1h",
    votes: 4200,
    title:
      "React 19 server actions are underrated — you can eliminate 90% of your API routes",
    comments: 198,
    thumbnail: false,
    thumbnailColor: "",
    flair: "Question",
  },
  {
    id: 4,
    subreddit: "r/typescript",
    subredditColor: "#3178c6",
    subredditLetter: "T",
    author: "u/type_lord",
    time: "8h",
    votes: 9100,
    title:
      "TypeScript 5.5 just dropped and the new inferred type predicates are incredible",
    comments: 421,
    thumbnail: true,
    thumbnailColor: "#3178c6",
    flair: "News",
  },
];

function VoteButton({
  icon,
  onClick,
  active,
  activeColor,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  active: boolean;
  activeColor: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-1 rounded transition-colors ${
        active ? `text-[${activeColor}]` : "text-[#878a8c] hover:text-[#1c1c1c] hover:bg-[#e8e8e8]"
      }`}
    >
      {icon}
    </button>
  );
}

function PostCard({ post }: { post: (typeof MOCK_POSTS)[0] }) {
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const displayVotes =
    vote === "up" ? post.votes + 1 : vote === "down" ? post.votes - 1 : post.votes;

  return (
    <div className="bg-white border border-[#edeff1] rounded hover:border-[#898989] cursor-pointer transition-colors flex overflow-hidden mb-2">
      {/* Vote column */}
      <div className="bg-[#f8f9fa] flex flex-col items-center py-2 px-1 gap-0.5 w-10 shrink-0">
        <button
          onClick={() => setVote(vote === "up" ? null : "up")}
          className={`p-1 rounded transition-colors hover:bg-[#e8e8e8] ${
            vote === "up" ? "text-[#ff4500]" : "text-[#878a8c] hover:text-[#ff4500]"
          }`}
        >
          <ArrowUp className="w-4 h-4" />
        </button>
        <span
          className={`text-xs font-bold leading-none ${
            vote === "up"
              ? "text-[#ff4500]"
              : vote === "down"
              ? "text-[#7193ff]"
              : "text-[#1c1c1c]"
          }`}
        >
          {displayVotes >= 1000
            ? `${(displayVotes / 1000).toFixed(1)}k`
            : displayVotes}
        </span>
        <button
          onClick={() => setVote(vote === "down" ? null : "down")}
          className={`p-1 rounded transition-colors hover:bg-[#e8e8e8] ${
            vote === "down" ? "text-[#7193ff]" : "text-[#878a8c] hover:text-[#7193ff]"
          }`}
        >
          <ArrowDown className="w-4 h-4" />
        </button>
      </div>

      {/* Post content */}
      <div className="flex-1 min-w-0 p-2 pr-3">
        {/* Meta */}
        <div className="flex items-center gap-1 text-xs text-[#878a8c] mb-1 flex-wrap">
          <div className="flex items-center gap-1">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shrink-0"
              style={{ backgroundColor: post.subredditColor }}
            >
              {post.subredditLetter}
            </div>
            <span className="font-bold text-[#1c1c1c] hover:underline">
              {post.subreddit}
            </span>
          </div>
          <span>•</span>
          <span>Posted by {post.author}</span>
          <span>{post.time} ago</span>
          {post.flair && (
            <span className="bg-[#edeff1] text-[#878a8c] px-1.5 py-0.5 rounded-full text-[10px] font-medium">
              {post.flair}
            </span>
          )}
        </div>

        {/* Title */}
        <h2 className="text-[18px] font-medium text-[#222222] leading-snug mb-2 pr-2">
          {post.title}
        </h2>

        {/* Action bar */}
        <div className="flex items-center gap-0.5 text-xs text-[#878a8c] flex-wrap">
          <button className="flex items-center gap-1 px-2 py-1.5 rounded font-bold hover:bg-[#f6f7f8] transition-colors">
            <MessageSquare className="w-4 h-4" />
            {post.comments} Comments
          </button>
          <button className="flex items-center gap-1 px-2 py-1.5 rounded font-bold hover:bg-[#f6f7f8] transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
          <button className="flex items-center gap-1 px-2 py-1.5 rounded font-bold hover:bg-[#f6f7f8] transition-colors">
            <Bookmark className="w-4 h-4" />
            Save
          </button>
          <button className="flex items-center gap-1 px-2 py-1.5 rounded font-bold hover:bg-[#f6f7f8] transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Thumbnail */}
      {post.thumbnail && (
        <div
          className="w-24 h-18 rounded m-2 shrink-0 self-center flex items-center justify-center"
          style={{ backgroundColor: post.thumbnailColor + "33", minHeight: "72px" }}
        >
          <ImageIcon className="w-6 h-6" style={{ color: post.thumbnailColor }} />
        </div>
      )}
    </div>
  );
}

const SORT_OPTIONS = [
  { icon: <Flame className="w-4 h-4" />, label: "Hot" },
  { icon: <Sparkles className="w-4 h-4" />, label: "New" },
  { icon: <TrendingUp className="w-4 h-4" />, label: "Top" },
  { icon: <BarChart2 className="w-4 h-4" />, label: "Rising" },
];

const HomePage = () => {
  const { user } = useUserStore();
  const [activeSort, setActiveSort] = useState("Hot");

  return (
    <div className="max-w-6xl mx-auto px-4 py-5 flex gap-5">
      {/* Left sidebar */}
      <aside className="w-60 shrink-0 hidden xl:block">
        <div className="sticky top-16 bg-white border border-[#edeff1] rounded overflow-hidden">
          {/* Feeds */}
          <div className="px-3 pt-3 pb-1">
            <p className="text-[11px] font-bold text-[#878a8c] uppercase tracking-widest mb-1">
              Feeds
            </p>
          </div>
          {[
            { icon: <Home className="w-4 h-4" />, label: "Home", active: true },
            { icon: <Globe className="w-4 h-4" />, label: "Popular" },
            { icon: <Zap className="w-4 h-4" />, label: "All" },
          ].map(({ icon, label, active }) => (
            <button
              key={label}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-[#f6f7f8] ${
                active ? "text-[#0079d3]" : "text-[#1c1c1c]"
              }`}
            >
              <span className={active ? "text-[#0079d3]" : "text-[#878a8c]"}>
                {icon}
              </span>
              {label}
            </button>
          ))}

          {/* Communities */}
          <div className="border-t border-[#edeff1] mt-1 px-3 pt-3 pb-1">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] font-bold text-[#878a8c] uppercase tracking-widest">
                My Communities
              </p>
              <button className="text-[#878a8c] hover:text-[#1c1c1c]">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          {COMMUNITIES.map(({ name, color, letter }) => (
            <button
              key={name}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#1c1c1c] hover:bg-[#f6f7f8] transition-colors"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                style={{ backgroundColor: color }}
              >
                {letter}
              </div>
              <span className="truncate font-medium">{name}</span>
            </button>
          ))}

          {/* Others */}
          <div className="border-t border-[#edeff1] mt-1 px-3 pt-3 pb-1">
            <p className="text-[11px] font-bold text-[#878a8c] uppercase tracking-widest mb-1">
              Others
            </p>
          </div>
          {[
            { icon: <Users className="w-4 h-4" />, label: "Create Community" },
          ].map(({ icon, label }) => (
            <button
              key={label}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-[#1c1c1c] hover:bg-[#f6f7f8] transition-colors"
            >
              <span className="text-[#878a8c]">{icon}</span>
              {label}
            </button>
          ))}
          <div className="h-2" />
        </div>
      </aside>

      {/* Feed */}
      <div className="flex-1 min-w-0">
        {/* Create post bar */}
        <div className="bg-white border border-[#edeff1] rounded flex items-center gap-2 p-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#ff4500] flex items-center justify-center text-white text-sm font-bold shrink-0">
            {user?.firstName[0].toUpperCase()}
          </div>
          <input
            type="text"
            placeholder="Create Post"
            readOnly
            className="flex-1 bg-[#f6f7f8] border border-[#edeff1] rounded h-9 px-3 text-sm outline-none hover:border-[#0079d3] focus:border-[#0079d3] cursor-pointer transition-colors placeholder:text-[#878a8c]"
          />
          <button className="w-9 h-9 flex items-center justify-center rounded border border-[#edeff1] hover:bg-[#f6f7f8] text-[#878a8c] transition-colors">
            <ImageIcon className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded border border-[#edeff1] hover:bg-[#f6f7f8] text-[#878a8c] transition-colors">
            <LinkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Sort bar */}
        <div className="bg-white border border-[#edeff1] rounded flex items-center gap-1 px-3 py-2 mb-3">
          {SORT_OPTIONS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveSort(label)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold transition-colors ${
                activeSort === label
                  ? "bg-[#e8e8e8] text-[#0079d3]"
                  : "text-[#878a8c] hover:bg-[#f6f7f8] hover:text-[#1c1c1c]"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* Posts */}
        {MOCK_POSTS.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Right sidebar */}
      <aside className="w-72 shrink-0 hidden lg:block">
        <div className="sticky top-16 flex flex-col gap-3">
          {/* Home widget */}
          <div className="bg-white border border-[#edeff1] rounded overflow-hidden">
            <div
              className="h-20 relative"
              style={{
                background: "linear-gradient(to bottom right, #ff4500, #ff6534)",
              }}
            />
            <div className="p-3 -mt-4">
              <div className="w-10 h-10 rounded-full bg-white border-2 border-white flex items-center justify-center mb-2">
                <Home className="w-5 h-5 text-[#1c1c1c]" />
              </div>
              <h3 className="font-bold text-[#1c1c1c] mb-0.5">Home</h3>
              <p className="text-xs text-[#1c1c1c] mb-3 leading-relaxed">
                Your personal Reddit frontpage. Come here to check in with your
                favorite communities.
              </p>
              <div className="flex gap-3 mb-3 text-xs text-[#1c1c1c]">
                <div>
                  <p className="font-bold">16.4k</p>
                  <p className="text-[#878a8c]">Members</p>
                </div>
                <div>
                  <p className="font-bold text-[#46d160]">• 412</p>
                  <p className="text-[#878a8c]">Online</p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="w-full bg-[#ff4500] text-white rounded-full py-1.5 text-sm font-bold hover:bg-[#e03d00] transition-colors">
                  Create Post
                </button>
                <button className="w-full border border-[#ff4500] text-[#ff4500] rounded-full py-1.5 text-sm font-bold hover:bg-orange-50 transition-colors">
                  Create Community
                </button>
              </div>
            </div>
          </div>

          {/* Top communities */}
          <div className="bg-white border border-[#edeff1] rounded p-3">
            <h4 className="text-sm font-bold text-[#1c1c1c] mb-3 uppercase tracking-wide">
              Top Communities
            </h4>
            {COMMUNITIES.map(({ name, color, letter, members }, idx) => (
              <div
                key={name}
                className="flex items-center gap-2 py-1.5 hover:bg-[#f6f7f8] -mx-3 px-3 rounded cursor-pointer transition-colors"
              >
                <span className="text-xs text-[#878a8c] w-4 shrink-0 text-right">
                  {idx + 1}
                </span>
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                  style={{ backgroundColor: color }}
                >
                  {letter}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#1c1c1c] truncate">{name}</p>
                  <p className="text-[11px] text-[#878a8c]">{members} members</p>
                </div>
                <button className="text-xs font-bold border border-[#0079d3] text-[#0079d3] rounded-full px-2.5 py-0.5 hover:bg-[#e8f0fe] transition-colors shrink-0">
                  Join
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-1">
            <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-[#878a8c]">
              {["Help", "About", "Careers", "Press", "Blog", "Rules", "Privacy Policy", "User Agreement"].map(
                (link) => (
                  <span
                    key={link}
                    className="hover:underline cursor-pointer"
                  >
                    {link}
                  </span>
                )
              )}
            </div>
            <p className="text-[11px] text-[#878a8c] mt-2">
              Reddit Inc © 2026. All rights reserved.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default HomePage;

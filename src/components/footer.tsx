import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto text-center text-zinc-300 py-5 px-7 border-t border-zinc-700 flex justify-between items-center">
      <small>made with ❤️ by Bartu Çakır</small>
      <div className="social-icons flex gap-3">
        <Link
          href="https://www.linkedin.com/in/bartwocakir/"
          className="linkedin"
          target="_blank"
        >
          <Image
            alt="LinkedIn"
            width={27}
            height={27}
            src="/linkedin-with-circle.svg"
            className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-400 transition-colors"
          />
        </Link>
        <Link
          target="_blank"
          href="https://github.com/bartwo21/my-blog"
          className="github"
        >
          <Image
            alt="GitHub"
            color="white"
            width={27}
            height={27}
            className="bg-white rounded-full p-1 cursor-pointer hover:bg-gray-400 transition-colors"
            src="/github-logo.png"
          />
        </Link>
      </div>
      <small>&copy; 2024. All rights reserved.</small>
    </footer>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-6xl px-4">
        <div className="py-6 text-center">
          <p className="text-sm text-white/80">
            &copy; {new Date().getFullYear()} Arikmhm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

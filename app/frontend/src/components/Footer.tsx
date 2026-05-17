const Footer = () => {
  return (
    <footer className="bg-[#1F3A5F] text-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h3 className="text-xl font-bold mb-4">株式会社 大福工務店</h3>
        <p className="text-white/80 text-sm mb-2">
          〒601-8121 京都府京都市南区上鳥羽高畠町6
        </p>
        <p className="text-white/80 text-sm mb-6">
          TEL: 075-123-4567 ／ FAX: 075-123-4568
        </p>
        <div className="border-t border-white/20 pt-6">
          <p className="text-white/60 text-sm">
            © 2026 株式会社 大福工務店. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
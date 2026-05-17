const companyInfo = [
  { label: "会社名", value: "株式会社 大福工務店" },
  { label: "代表者", value: "大福 太郎" },
  { label: "所在地", value: "〒601-8121 京都府京都市南区上鳥羽高畠町6" },
  { label: "電話番号", value: "075-123-4567" },
  { label: "FAX", value: "075-123-4568" },
  { label: "事業内容", value: "木造住宅の新築・リフォーム・リノベーション・修繕工事" },
  { label: "建設業許可", value: "京都府知事許可（般-XX）第XXXXX号" },
];

const CompanySection = () => {
  return (
    <section id="company" className="py-20 md:py-28 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3A5F] text-center mb-14">
          会社概要
        </h2>

        {/* Company Info Table */}
        <div className="mb-12">
          <table className="w-full">
            <tbody>
              {companyInfo.map((item) => (
                <tr key={item.label} className="border-b border-gray-200">
                  <th className="py-4 px-4 text-left text-[#1F3A5F] font-medium w-1/4 text-sm md:text-base align-top">
                    {item.label}
                  </th>
                  <td className="py-4 px-4 text-gray-700 text-sm md:text-base">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Google Map */}
        <div className="rounded-lg overflow-hidden shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.5!2d135.75!3d34.97!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2z5Lqs6YO95bqc5Lqs6YO95biC5Y2X5Yy65LiK6bOl576955Wg55Wg55S6Ng!5e0!3m2!1sja!2sjp!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="大福工務店 所在地"
          />
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
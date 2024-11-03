import { FaFacebook, FaEnvelope, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="ml-10 bg-gradient-to-r from-gray-900 via-gray-800 to-black bg-opacity-70 text-gray-200 py-8 px-6 rounded-lg shadow-lg">
      <h3 className="text-wrap font-semibold text-gray-100 mb-4 ml-5">
        Phim chất lượng cao online của <span className="text-blue-400">DukeMax</span> khác gì so với các trang phim khác?
      </h3>
      <ul className="list-disc text-clip list-inside space-y-2 mb-6">
        <li>Là phim bluray (reencoded), có độ phân giải thấp nhất là Full HD (1080p), trong khi hầu hết các trang phim khác chỉ có tới độ phân giải HD (720p) là cao nhất</li>
        <li>Chất lượng cao, lượng dữ liệu trên giây (bitrate) gấp từ 5 - 10 lần phim online thông thường - đây là yếu tố quyết định độ nét của phim (thậm chí còn quan trọng hơn độ phân giải)</li>
        <li>Âm thanh 5.1 (6 channel) thay vì stereo (2 channel) như các trang phim khác (kể cả Youtube)</li>
        <li>Phù hợp để xem trên màn hình TV, máy tính, laptop có độ phân giải cao</li>
        <li>Nếu không hài lòng với phụ đề có sẵn, bạn có thể tự upload phụ đề của riêng mình để xem online</li>
        <li>Có lựa chọn hiện phụ đề song ngữ (tự hiện đồng thời cả tiếng Anh & tiếng Việt), phù hợp với những người muốn học tiếng Anh qua phụ đề phim</li>
      </ul>
      <div className="flex justify-center space-x-4">
        <a href="mailto:example@example.com" className="text-gray-200 hover:text-blue-400 transition duration-200">
          <FaEnvelope size={24} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition duration-200">
          <FaFacebook size={24} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-400 transition duration-200">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-pink-500 transition duration-200">
          <FaInstagram size={24} />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-red-500 transition duration-200">
          <FaYoutube size={24} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-blue-600 transition duration-200">
          <FaLinkedin size={24} />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

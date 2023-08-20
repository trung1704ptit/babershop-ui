const Contact = () => {
  return (
    <section className="bg-grey lg:flex w-full" id="dia-chi">
      <div className="w-full lg:w-50 p-10 text-black flex">
        <div className="m-auto">
          <h1 className="text-black mb-8">Địa chỉ</h1>
          <p className="text-lg">Địa chỉ: 783 Âu Cơ, phố Hồ, Thị xã Thuận Thành, Bắc Ninh</p>
          <p className="text-lg">Điện thoại: <a href="tel:0965813633">0965.813.633</a></p>
          <p className="text-lg">Email: <a href="mailto:nguyendinhquang99bn@gmail.com ">nguyendinhquang99bn@gmail.com </a></p>
          <p className="text-lg">Mở cửa: tất cả các ngày trong tuần từ 8h-20h</p>
        </div>
      </div>
      <div className="w-full lg:w-50">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.6760926103216!2d106.0887220776703!3d21.045642530606973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a16e9219e70b%3A0x2948bcdba372700c!2sROY%20Barber%20Shop!5e0!3m2!1sen!2ssg!4v1691205084322!5m2!1sen!2ssg" width="100%" height="450" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      </div>
    </section>
  )
}

export default Contact;
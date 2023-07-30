const ScrollToTop = () => {
  const onClick = () => {
    const access = document.getElementById("header");
    window.scrollTo({
      top: access?.scrollTop,
      left: access?.scrollLeft,
      behavior: 'smooth'
    });
  }
  return (
    <a data-scroll onClick={onClick} id="scroll-to-top" className="d-block cursor-pointer"><i className="arrow_up" /></a>
  )
}

export default ScrollToTop;
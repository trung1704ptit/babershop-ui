const Stylist = () => {
  return (
    <div>
      <div className="flex flex-wrap container mt-[120px] mb-[120px]">
        {
          [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21].map(time => {
            if (Number.isInteger(time)) {
              return (
                <div className="p-2 w-1/2 md:w-1/4 h-[100px]" key={time}>
                  <div className="shadow-md rounded cursor-pointer text-center w-100 h-100 flex">
                    <span className="m-auto">{time}h:00 - {time}h:30</span>
                  </div>
                </div>
              )
            }
            return (
              <div className="p-2 w-1/2 md:w-1/4 h-[100px]" key={time}>
                <div className="shadow-md rounded cursor-pointer text-center w-100 h-100 flex">
                  <span className="m-auto">{time - 0.5}h:30 - {time + 0.5}h:00</span>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className="fixed flex items-center justify-center rounded-b bottom-0 left-0 w-100 bg-white p-3 shadow-lg">
        <button
          className="text-white w-full sm:w-4/12 md:6/12 bg-[#9f6e0dd4] text-whitefont-bold uppercase text-sm px-3 py-2.5 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150"
          type="button"
        >
          Hoàn tất <span className="arrow_right"></span>
        </button>
      </div>
    </div>

  )
}

export default Stylist;
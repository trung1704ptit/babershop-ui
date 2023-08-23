/* eslint-disable @next/next/no-img-element */
import { IProduct } from "./types";

interface IProps {
  products: IProduct[]
}

const Products = (props: IProps) => {
  return (
    <section className="text-gray-600 body-font mt-[80px] mb-[80px]">
      <div className="section_heading text-center mb-40">
        <h2>Sản phẩm</h2>
        <div className="heading-line" />
      </div>
      <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {props?.products?.map((p: IProduct) => (
          <div className="" key={p.id}>
            <div className="">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt={p.title}
                  className="block h-auto md:h-full"
                  src={p.image}
                />
              </a>
              <div>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  {p.title}
                </h2>
                <p className="mt-1">{p.priceLabel}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section >
  )
}

export default Products;
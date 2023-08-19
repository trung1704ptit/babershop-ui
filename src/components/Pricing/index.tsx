import { groupBy } from 'lodash';

import { SERVICES } from "../../utils/constants";

const Pricing = () => {
  const serviceGroup = groupBy(SERVICES, 'category');

  return (
    <section className="pricing_section bg-grey bd-bottom padding" id="bang-gia">
      <div className="container">
        <div className="section_heading text-center mb-40 wow fadeInUp" data-wow-delay="300ms">
          <h2>Bảng giá</h2>
          <div className="heading-line" />
        </div>
        <div className="row">
          {Object.keys(serviceGroup).map(key => (
            <div className="col-lg-6 col-md-6 sm-padding" key={key}>
              <div className="price_wrap">
                <h3 className="rounded">{key}</h3>
                <ul className="price_list">
                  {serviceGroup[key]?.map(item => (
                    <li key={item.title}>
                      <h4>{item.title}</h4>
                      <p>{item.todos.join(', ')}
                      </p>
                      <span className="price">{item.priceLabel}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}

export default Pricing;
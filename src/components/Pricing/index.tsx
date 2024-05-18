import { groupBy } from 'lodash';

import { IService } from '../ManageServices';
import { SERVICE_CATEGORIES } from '../../utils/constants';

interface IProps {
  services: IService[];
}

const findCategory = (key: string) => {
  const service = SERVICE_CATEGORIES.find((item) => item.id === key);
  return service;
};

const Pricing = (props: IProps) => {
  const serviceGroup = groupBy(props.services, 'category');

  return (
    <section
      className='pricing_section bg-grey bd-bottom padding'
      id='bang-gia'
    >
      <div className='container'>
        <div
          className='section_heading text-center mb-40 wow fadeInUp'
          data-wow-delay='300ms'
        >
          <h2>Bảng giá</h2>
          <div className='heading-line' />
        </div>
        <div className='row'>
          {Object.keys(serviceGroup).map((key) => (
            <div className='col-lg-6 col-md-6 sm-padding' key={key}>
              <div className='price_wrap'>
                <h3 className='rounded'>{findCategory(key)?.name}</h3>
                <ul className='price_list'>
                  {serviceGroup[key]?.map((item) => (
                    <li key={item.name}>
                      <h4>{item.name}</h4>
                      <p>{item?.todos?.join(', ')}</p>
                      <span className='price'>{item.price_text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;

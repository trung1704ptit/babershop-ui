/* eslint-disable @next/next/no-img-element */
import { ITeam } from './type';

interface IProps {
  barbers: ITeam[];
}

const Team = (props: IProps) => {
  if (props.barbers) {
    const barbers = [...props.barbers];

    for (let i = 0; i < barbers.length; i++) {
      if (barbers[i]?.name.toLowerCase().includes('quang')) {
        const temp = barbers[i];
        if (temp && barbers && barbers[0] && barbers[i]) {
          barbers[i] = barbers[0];
          barbers[0] = temp;
        }
        break;
      }
    }

    return (
      <section id='team' className='team_section bd-bottom padding'>
        <div className='container'>
          <div
            className='section_heading text-center mb-40'
            data-wow-delay='300ms'
          >
            <h2>Đội ngũ Barbers giàu kinh nghiệm</h2>
            <div className='heading-line' />
          </div>
          <ul className='team_members row justify-center'>
            {barbers.map((barber) => (
              <li
                className='col-lg-3 col-md-6 sm-padding'
                data-wow-delay='200ms'
                key={barber.id}
              >
                <div className='team_member'>
                  <img
                    src={
                      props.barbers
                        ? `${process.env.NEXT_PUBLIC_APP_API_PATH}/api/${barber.photo}`
                        : barber.photo
                    }
                    alt='Team Member'
                  />
                  <div className='overlay shadow-lg'>
                    <h3>{barber.name}</h3>
                    <p>{barber.intro}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return null;
};

export default Team;

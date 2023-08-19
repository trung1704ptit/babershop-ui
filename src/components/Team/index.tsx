/* eslint-disable @next/next/no-img-element */
import { TEAM } from "../../utils/constants";

const Team = () => {
  return (
    <section id="team" className="team_section bd-bottom padding">
      <div className="container">
        <div className="section_heading text-center mb-40" data-wow-delay="300ms">
          <h2>Đội ngũ Barbers giàu kinh nghiệm</h2>
          <div className="heading-line" />
        </div>
        <ul className="team_members row justify-center">
          {TEAM.map(stylist => (
            <li className="col-lg-3 col-md-6 sm-padding" data-wow-delay="200ms" key={stylist.id}>
              <div className="team_member">
                <img src={stylist.avatar} alt="Team Member" />
                <div className="overlay shadow-lg">
                  <h3>{stylist.name}</h3>
                  <p>{stylist.description}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Team;
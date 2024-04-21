import { useIntl } from 'react-intl';
import Label from '../components/Label';
import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const ProjectCard = ({ project }) => {
  const intl = useIntl();

  return (
    <div
      data-testid="dream-card"
      className="relative bg-white rounded-lg shadow-md
            overflow-hidden flex flex-col w-full hover:shadow-lg
            transition-shadow duration-75 ease-in-out"
    >
      <img
        src={project.image}
        className="w-full h-48 object-cover object-center"
      />
      <Label className={`absolute right-0 m-2 ${project.labelColor}`}>
        {project.slug}
      </Label>
      <div className="p-4 pt-3 flex-grow flex flex-col justify-between">
        <div className="mb-2">
          <h3 className="text-xl font-medium mb-1 truncate">{project.title}</h3>

          <div className="text-gray-800">
            <span dangerouslySetInnerHTML={{ __html: project.summary }} />
          </div>
        </div>
        <div>
          <div className="flex gap-x-3 mt-1"></div>
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ currentUser }) => {
  return (
    <>
      <div className="mt-28 lg:ml-28 lg:mr-28 sm:ml-8 sm:mr-8">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 relative pb-20">
          {projects.map((project) => (
            <Link href={`c/${project.slug}/`} key={project.id}>
              <a
                className="flex focus:outline-none focus:ring rounded-lg"
                onClick={() => {
                  Router.push(
                    {
                      query: {
                        ...Router.query,
                      },
                    },
                    undefined,
                    { shallow: true, scroll: false }
                  );
                }}
              >
                <ProjectCard project={project} />
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

const projectCamps = {
  image:
    'https://static.wixstatic.com/media/a1a386_b23c1b1487cc4edc802fcb21772579d5~mv2.jpg/v1/fill/w_512,h_434,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a1a386_b23c1b1487cc4edc802fcb21772579d5~mv2.jpg',
  title: 'Camps - קמפים',
  summary:
    'המקום לקמפים לגייס חברים חדשים לחיים ולחברים למצוא בית\n' +
    '<br/><br/>The place to recruit new friends for life and find a home',
  slug: 'camps',
  labelColor: 'bg-pink',
  id: 'camps',
};

const projectDreams = {
  image:
    'https://static.wixstatic.com/media/a1a386_0d4758c1296847faa5ead1ee3f8617c2~mv2.jpg/v1/fill/w_512,h_434,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/a1a386_0d4758c1296847faa5ead1ee3f8617c2~mv2.jpg',
  title: 'Dreams - חלומות',
  summary:
    'מחפש לבנות ספינת חלל או להצטרף לצוות? זה המקום' +
    '<br/><br/>' +
    'Want to build a spaceship Or join a new team? This is the place!',
  slug: 'dreams',
  labelColor: 'bg-app-purple',
  id: 'dreams',
};

const projectDepartments = {
  image:
    'https://static.wixstatic.com/media/a1a386_6129bfc3b0964fe59b474c9fe5a48f0c~mv2.jpg/v1/fill/w_1773,h_1182,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/a1a386_6129bfc3b0964fe59b474c9fe5a48f0c~mv2.jpg',
  title: 'Departments - מחלקות',
  summary:
    'הכירו את מחלקות שמגייסות וקחו חלק בעשייה משמעותית באירוע' +
    '<br/><br/>' +
    "Get to know our cit'y departments and get involved",
  slug: 'departments',
  labelColor: 'bg-app-purple',
  id: 'departments',
};

// init projects
const projects = [projectCamps, projectDreams, projectDepartments];

export default HomePage;

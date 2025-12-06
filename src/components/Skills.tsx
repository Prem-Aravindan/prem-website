const skills = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js", "HTML/CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "Express", "Django", "REST APIs", "GraphQL"],
  },
  {
    category: "Database",
    items: ["PostgreSQL", "MongoDB", "Redis", "MySQL", "Firebase"],
  },
  {
    category: "DevOps & Tools",
    items: ["Docker", "Git", "CI/CD", "AWS", "Vercel", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skillSet, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-600">
                {skillSet.category}
              </h3>
              <ul className="space-y-2">
                {skillSet.items.map((skill, idx) => (
                  <li 
                    key={idx}
                    className="flex items-center text-gray-700"
                  >
                    <span className="w-2 h-2 bg-purple-600 rounded-full mr-3"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, MapPin, Calendar, ExternalLink, Award, Briefcase, GraduationCap, User, Menu, X, ChevronDown, Code, Lightbulb, Target, Github } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isVisible, setIsVisible] = useState({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown !== null && !event.target.closest('.relative')) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
    setIsMenuOpen(false);
    setActiveDropdown(null);
  };

  const navGroups = [
    {
      label: 'About',
      items: [
        { id: 'home', label: 'Home', icon: User },
        { id: 'about', label: 'About Me', icon: Target },
        { id: 'contact', label: 'Contact', icon: Mail }
      ]
    },
    {
      label: 'Background',
      items: [
        { id: 'education', label: 'Education', icon: GraduationCap },
        { id: 'skills', label: 'Skills', icon: Code },
        { id: 'experience', label: 'Experience', icon: Briefcase }
      ]
    },
    {
      label: 'Portfolio',
      items: [
        { id: 'projects', label: 'Projects', icon: Code },
        { id: 'certifications', label: 'Certifications', icon: Award },
        { id: 'workshops', label: 'Workshops', icon: Lightbulb },
        { id: 'achievements', label: 'Achievements', icon: Award }
      ]
    }
  ];

  const mobileNavItems = navGroups.flatMap(group => group.items);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white overflow-x-hidden">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Siddharth
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navGroups.map((group, groupIndex) => (
                <div key={group.label} className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === groupIndex ? null : groupIndex)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                      group.items.some(item => item.id === activeSection)
                        ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/20'
                        : 'hover:bg-white/10 hover:text-white text-gray-300'
                    }`}
                  >
                    <span>{group.label}</span>
                    <ChevronDown 
                      size={16} 
                      className={`transition-transform duration-300 ${
                        activeDropdown === groupIndex ? 'rotate-180' : ''
                      }`} 
                    />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {activeDropdown === groupIndex && (
                    <div className="absolute top-full left-0 mt-2 w-56 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/50 py-2 z-50">
                      {group.items.map(({ id, label, icon: Icon }) => (
                        <button
                          key={id}
                          onClick={() => scrollToSection(id)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-300 ${
                            activeSection === id
                              ? 'bg-blue-500/20 text-blue-400 border-r-2 border-blue-400'
                              : 'hover:bg-white/10 hover:text-white text-gray-300'
                          }`}
                        >
                          <Icon size={18} />
                          <span className="font-medium">{label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-white/10">
              <div className="flex flex-col space-y-2 mt-4">
                {mobileNavItems.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeSection === id 
                        ? 'bg-blue-500/20 text-blue-400' 
                        : 'hover:bg-white/10'
                    }`}
                  >
                    <Icon size={18} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/8 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className={`relative z-10 text-center max-w-5xl mx-auto px-6 transition-all duration-1000 ${
          isVisible.home ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Profile Image */}
          <div className="mb-12 relative">
            <div className="w-52 h-52 mx-auto rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-cyan-400 p-1 animate-spin-slow shadow-2xl shadow-blue-500/20">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <img 
                  src="assets/Black White Minimalist Business Twitter Profile Picture (1).png" 
                  className="w-full h-full rounded-full object-cover shadow-inner"
                />
              </div>
            </div>
            <div className="absolute -bottom-3 -right-3 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-green-500/30">
              <span className="text-2xl filter drop-shadow-sm">👋</span>
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient leading-tight">
            Siddharth Madhu Rao
          </h1>
          
          <div className="text-xl md:text-2xl text-blue-200 mb-10 font-light">
            <span className="inline-block animate-typewriter">Student at SSN College of Engineering</span>
          </div>

          <p className="text-lg md:text-xl text-gray-300 mb-16 max-w-3xl mx-auto leading-relaxed">
            Technologist focused on building innovative solutions across software, AI, and immersive experiences to address real-world challenges.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => scrollToSection('about')}
              className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full font-semibold hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px]"
            >
              <Lightbulb size={20} />
              Discover My Journey
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-10 py-4 border-2 border-blue-400 rounded-full font-semibold hover:bg-blue-400 hover:text-slate-900 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-[200px]"
            >
              <Mail size={20} />
              Get In Touch
            </button>
            <a
              href="https://github.com/Sidtheogdeveloper"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 hover:shadow-xl hover:shadow-gray-500/20 min-w-[200px]"
            >
              <Github size={20} />
              View GitHub
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDown size={28} className="text-blue-400 opacity-70" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.about ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                About Me
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-6">
                <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-blue-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-blue-500/20 rounded-xl flex items-center justify-center">
                      <Target className="text-blue-400" size={24} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold">My Objective</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    Versatile and driven technology enthusiast focused on building impactful, 
                    user-centric solutions through innovative thinking and a strong technical 
                    foundation. Skilled at transforming complex ideas into practical outcomes 
                    and committed to continuous learning and contributing to transformative 
                    work across diverse domains.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Code, title: "Development", desc: "Full-stack development with modern technologies" },
                  { icon: Lightbulb, title: "Innovation", desc: "Always exploring cutting-edge solutions" },
                  { icon: Target, title: "Goals", desc: "Focused on creating impactful applications" }
                ].map(({ icon: Icon, title, desc }, index) => (
                  <div
                    key={title}
                    className={`flex items-center gap-6 p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-500 transform hover:translate-x-4 hover:shadow-xl hover:shadow-purple-500/10 ${
                      isVisible.about ? 'animate-slide-in-right' : ''
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className="w-14 h-14 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="text-purple-400" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-xl">{title}</h4>
                      <p className="text-gray-400">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.education ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Education
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-10">
              {[
                {
                  institution: "SSN College of Engineering, Chennai",
                  duration: "August 2023 - Present",
                  course: "Master of Technology (5-Years Integrated) Computer Science Engineering",
                  performance: "CGPA: 8.036",
                  color: "blue"
                },
                {
                  institution: "Lalaji Memorial Omega International School",
                  duration: "June 2022 - May 2023",
                  course: "Grade 12",
                  performance: "95%",
                  color: "green"
                }
              ].map((edu, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-${edu.color}-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-${edu.color}-500/10 ${
                    isVisible.education ? 'animate-slide-in-left' : ''
                  }`}
                  style={{ animationDelay: `${index * 300}ms` }}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-18 h-18 bg-${edu.color}-500/20 rounded-2xl flex items-center justify-center`}>
                        <GraduationCap className={`text-${edu.color}-400`} size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">{edu.institution}</h3>
                        <p className="text-gray-400 text-lg">{edu.course}</p>
                      </div>
                    </div>
                    <div className="text-left lg:text-right mt-6 lg:mt-0">
                      <div className="flex items-center gap-2 text-gray-300 mb-3">
                        <Calendar size={16} />
                        <span>{edu.duration}</span>
                      </div>
                      <div className={`inline-block px-6 py-3 bg-${edu.color}-500/20 rounded-full`}>
                        <span className={`font-bold text-${edu.color}-400 text-lg`}>{edu.performance}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.skills ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent">
                Skills & Expertise
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-8 text-xl max-w-3xl mx-auto">
                A comprehensive toolkit of technologies and methodologies for building innovative solutions
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  category: "Programming Languages",
                  skills: ["Python", "C++", "Java", "TypeScript"],
                  icon: "💻",
                  color: "cyan"
                },
                {
                  category: "Frameworks",
                  skills: ["Kivy", "TensorFlow", "Scikit-Learn", "Flask"],
                  icon: "🔧",
                  color: "blue"
                },
                {
                  category: "Tools",
                  skills: ["Git", "Unreal Engine"],
                  icon: "⚙️",
                  color: "purple"
                },
                {
                  category: "Machine Learning",
                  skills: ["Supervised Learning", "Unsupervised Learning"],
                  icon: "🤖",
                  color: "green"
                },
                {
                  category: "Database Management",
                  skills: ["SQL", "MongoDB", "Neo4J"],
                  icon: "🗄️",
                  color: "orange"
                },
                {
                  category: "Soft Skills",
                  skills: ["Problem-solving", "Team Collaboration", "Time Management", "Communication"],
                  icon: "🎯",
                  color: "pink"
                }
              ].map((skillGroup, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-${skillGroup.color}-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-${skillGroup.color}-500/10 ${
                    isVisible.skills ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 bg-${skillGroup.color}-500/20 rounded-2xl flex items-center justify-center text-2xl`}>
                      {skillGroup.icon}
                    </div>
                    <h3 className={`text-xl font-bold text-${skillGroup.color}-400`}>
                      {skillGroup.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skillGroup.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`px-4 py-2 bg-${skillGroup.color}-500/20 text-${skillGroup.color}-300 rounded-full text-sm font-medium border border-${skillGroup.color}-500/30 hover:bg-${skillGroup.color}-500/30 transition-all duration-300`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.experience ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Work Experience
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-orange-500 to-red-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-16">
              {[
                {
                  company: "StudAI Edutech Pvt.Ltd.",
                  position: "R&D Developer",
                  duration: "January 2025 - April 2025",
                  responsibilities: [
                    "Researched AI Lab implementation in South Indian colleges; analyzed feasibility of Centers of Excellence (COEs).",
                    "Explored key use cases and model requirements for StudAI Genie in academic settings.",
                    "Investigated DeepSeek open-source project to identify integration and customization opportunities for StudAI Genie.",
                    "Facilitated team collaboration through research documentation and model proposal strategies."
                  ],
                  color: "orange"
                },
                {
                  company: "Mindler Inc.",
                  position: "Digital Marketing Intern",
                  duration: "November 2022 - December 2022",
                  responsibilities: [
                    "Conducted market research and competitive analysis to find new business opportunities, contributing to the development of a strategic growth plan."
                  ],
                  color: "red"
                }
              ].map((exp, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-${exp.color}-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-${exp.color}-500/10 ${
                    isVisible.experience ? 'animate-slide-in-right' : ''
                  }`}
                  style={{ animationDelay: `${index * 400}ms` }}
                >
                  <div className="flex items-start gap-8">
                    <div className={`w-18 h-18 bg-${exp.color}-500/20 rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <Briefcase className={`text-${exp.color}-400`} size={32} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{exp.company}</h3>
                          <h4 className={`text-xl font-semibold text-${exp.color}-400`}>{exp.position}</h4>
                        </div>
                        <div className="flex items-center gap-2 text-gray-300 mt-4 lg:mt-0">
                          <Calendar size={16} />
                          <span>{exp.duration}</span>
                        </div>
                      </div>
                      <ul className="space-y-4">
                        {exp.responsibilities.map((resp, respIndex) => (
                          <li key={respIndex} className="flex items-start gap-4 text-gray-300">
                            <div className={`w-2.5 h-2.5 bg-${exp.color}-500 rounded-full mt-2.5 flex-shrink-0`}></div>
                            <span className="leading-relaxed text-lg">{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.projects ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-8 text-xl max-w-3xl mx-auto">
                Innovative solutions built with passion and cutting-edge technology
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-10">
              {[
                {
                  title: "StockTrader Pro",
                  description: "Data-driven investment ingsights platform with market analysis and trading suggestions",
                  features: [
                    "Machine learning-powered stock analysis",
                    "Historical data processing and trend analysis",
                    "Smart investment recommendations and insights"
                  ],
                  tech: ["Machine Learning", "Web Development", "Financial APIs", "Data Analysis"],
                  github: "https://github.com/username/stocktrader-pro",
                  website: "https://stocktraderspro.netlify.app",
                  color: "orange",
                  icon: "📈"
                },
                {
                  title: "Cab Hailing App",
                  description: "Python-based ride booking application with intelligent driver assignment",
                  features: [
                    "Smart driver assignment algorithm based on time and rating",
                    "Comprehensive API server for data management",
                    "Real-time ride tracking and booking system"
                  ],
                  tech: ["Python", "API development with Django", "Database Management", "App Development"],
                  github: "https://github.com/Sidtheogdeveloper/EzCabz",
                  color: "purple",
                  icon: "🚗"
                },
                {
                  title: "Budget Tracking App",
                  description: "Comprehensive financial management tool for personal budget tracking",
                  features: [
                    "Intuitive budget tracking and expense categorization",
                    "Integrated database for efficient data storage",
                    "Real-time financial insights and reporting"
                  ],
                  tech: ["Python", "MySQL Database", "App Development"],
                  github: "https://github.com/Sidtheogdeveloper/Budget-Tracker-App",
                  color: "green",
                  icon: "💰"
                },
                {
                  title: "Vehicle Maintenance & Driver Assistance",
                  description: "Intelligent vehicle monitoring platform with advanced assistance features",
                  features: [
                    "Real-time vehicle health monitoring",
                    "Driver assistance modules and safety alerts",
                    "Predictive maintenance scheduling system"
                  ],
                  tech: ["Python", "Machine Learning", "Alert Systems", "Web Development"],
                  github: "https://github.com/tri-tt-hik/Vehicle_maintenance_driver_assistance",
                  color: "blue",
                  icon: "🔧"
                }
              ].map((project, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-${project.color}-500/30 transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-2xl hover:shadow-${project.color}-500/10 ${
                    isVisible.projects ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-6 mb-8">
                    <div className={`w-18 h-18 bg-${project.color}-500/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
                      {project.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">{project.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{project.description}</p>
                    </div>
                  </div>

                  <div className="space-y-6 mb-8">
                    <h4 className={`font-semibold text-${project.color}-400 mb-3 text-lg`}>Key Features:</h4>
                    <ul className="space-y-3">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-4 text-gray-300">
                          <div className={`w-2.5 h-2.5 bg-${project.color}-500 rounded-full mt-2.5 flex-shrink-0`}></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className={`px-4 py-2 bg-${project.color}-500/20 text-${project.color}-400 rounded-full text-sm font-medium border border-${project.color}-500/30`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-3 px-6 py-3 bg-${project.color}-500/20 hover:bg-${project.color}-500/30 rounded-xl transition-all duration-300 text-${project.color}-400 hover:text-white transform hover:scale-105`}
                    >
                      <Code size={16} />
                      <span className="font-medium">GitHub</span>
                      <ExternalLink size={12} />
                    </a>
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 px-6 py-3 bg-${project.color}-500/20 hover:bg-${project.color}-500/30 rounded-xl transition-all duration-300 text-${project.color}-400 hover:text-white transform hover:scale-105`}
                      >
                        <ExternalLink size={16} />
                        <span className="font-medium">Website Link</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <button
                onClick={() => window.open('/projects', '_blank')}
                className="px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full font-semibold hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 mx-auto text-lg"
              >
                <Code size={20} />
                View All Projects
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.certifications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Certifications
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-yellow-500 to-orange-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                'Machine Learning in Python - Udemy',
                'Remote Sensing and GIS for Environmental Science from ISRO',
                'Cyber Security and Privacy - NPTEL',
                'C-Programming - Udemy'
              ].map((cert, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-yellow-500/30 transition-all duration-500 transform hover:scale-105 hover:rotate-1 hover:shadow-xl hover:shadow-yellow-500/10 ${
                    isVisible.certifications ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="text-yellow-400" size={28} />
                    </div>
                    <span className="text-white font-medium text-lg">{cert}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Section */}
      <section id="workshops" className="py-24 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.workshops ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Workshops & Training
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-8 text-xl max-w-3xl mx-auto">
                Continuous learning through specialized workshops and training programs
              </p>
            </div>

            <div className="space-y-8">
              {[
                {
                  title: "Mobile App Development with Flutter",
                  organization: "Professional Workshop",
                  duration: "Two-week workshop",
                  date: "February 2024",
                  description: "Comprehensive training in Flutter framework for cross-platform mobile application development",
                  color: "indigo",
                  icon: "📱"
                },
                {
                  title: "Logics and Proofs Workshop",
                  organization: "Institute of Mathematical Sciences, Chennai",
                  duration: "One week workshop",
                  date: "July 2022",
                  description: "Advanced mathematical concepts focusing on logical reasoning and proof techniques",
                  color: "purple",
                  icon: "🧮"
                },
                {
                  title: "Stream Data Management and Analytics in Big Data",
                  organization: "SSN College of Engineering",
                  duration: "3-day workshop",
                  date: "August 2024",
                  description: "Intensive training on real-time data processing and analytics in big data environments",
                  color: "blue",
                  icon: "📊"
                }
              ].map((workshop, index) => (
                <div
                  key={index}
                  className={`bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-${workshop.color}-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-${workshop.color}-500/10 ${
                    isVisible.workshops ? 'animate-slide-in-left' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start gap-8">
                    <div className={`w-18 h-18 bg-${workshop.color}-500/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0`}>
                      {workshop.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                        <div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{workshop.title}</h3>
                          <h4 className={`text-lg font-semibold text-${workshop.color}-400 mb-2`}>{workshop.organization}</h4>
                          <p className="text-gray-300 leading-relaxed">{workshop.description}</p>
                        </div>
                        <div className="text-left lg:text-right mt-4 lg:mt-0 lg:ml-8">
                          <div className="flex items-center gap-2 text-gray-300 mb-2">
                            <Calendar size={16} />
                            <span>{workshop.date}</span>
                          </div>
                          <div className={`inline-block px-4 py-2 bg-${workshop.color}-500/20 rounded-full`}>
                            <span className={`text-${workshop.color}-400 font-medium`}>{workshop.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`transition-all duration-1000 delay-200 ${
            isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                Achievements & Recognition
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-8 text-xl max-w-3xl mx-auto">
                Recognition for academic excellence and outstanding performance
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className={`bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/10 ${
                isVisible.achievements ? 'animate-fade-in-up' : ''
              }`}>
                <div className="flex items-start gap-8">
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0">
                    🏆
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-3">Student of the Class Award</h3>
                        <h4 className="text-xl font-semibold text-emerald-400 mb-4">Grade 12</h4>
                        <p className="text-gray-300 leading-relaxed text-lg mb-4">
                          Recognized for outstanding academic performance and exemplary conduct throughout the academic year.
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                          <span className="text-emerald-400 font-medium">Lalaji Memorial Omega International School</span>
                        </div>
                      </div>
                      <div className="mt-6 lg:mt-0 lg:ml-8">
                        <div className="inline-block px-6 py-3 bg-emerald-500/20 rounded-full">
                          <span className="text-emerald-400 font-bold text-lg">Academic Excellence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-black/20">
        <div className="max-w-6xl mx-auto px-6">
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible.contact ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Get In Touch
              </h2>
              <div className="w-32 h-1.5 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
              <p className="text-gray-300 mt-8 text-xl max-w-3xl mx-auto">
                Ready to collaborate on exciting projects? Let's connect!
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Mail,
                  title: "Email",
                  value: "siddharthmadhu2005@gmail.com",
                  href: "mailto:siddharthmadhu2005@gmail.com",
                  color: "blue"
                },
                {
                  icon: Phone,
                  title: "Phone",
                  value: "+91 9150914685",
                  href: "tel:+919150914685",
                  color: "green"
                },
                {
                  icon: Linkedin,
                  title: "LinkedIn",
                  value: "Connect with me",
                  href: "https://www.linkedin.com/in/siddharth-madhu17092005/",
                  color: "cyan"
                },
                {
                  icon: Github,
                  title: "GitHub",
                  value: "View my repositories",
                  href: "https://github.com/Sidtheogdeveloper",
                  color: "gray"
                }
              ].map(({ icon: Icon, title, value, href, color }, index) => (
                <a
                  key={title}
                  href={href}
                  target={title === "LinkedIn" || title === "GitHub" ? "_blank" : undefined}
                  rel={title === "LinkedIn" || title === "GitHub" ? "noopener noreferrer" : undefined}
                  className={`block bg-white/5 backdrop-blur-sm rounded-3xl p-10 border border-white/10 hover:border-${color}-500/30 transition-all duration-500 transform hover:scale-105 hover:-translate-y-4 group hover:shadow-2xl hover:shadow-${color}-500/10 ${
                    isVisible.contact ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-center">
                    <div className={`w-18 h-18 bg-${color}-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`text-${color}-400`} size={32} />
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-3">{title}</h3>
                    <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-lg break-words max-w-[220px] mx-auto">{value}</p>
                    {(title === "LinkedIn" || title === "GitHub") && (
                      <div className={`flex items-center justify-center gap-2 mt-3 text-${color}-400`}>
                        <span>View Profile</span>
                        <ExternalLink size={12} />
                      </div>
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400 text-lg">
            © 2025 Siddharth Madhu Rao. 
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

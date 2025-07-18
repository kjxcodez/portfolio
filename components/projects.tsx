"use client";
import React from "react";
import { projectData } from "@/data/projects";
import Image, { StaticImageData } from "next/image";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { DiGithubBadge } from "react-icons/di";
import { SquareArrowOutUpRight } from "lucide-react";
import { useRecoilValue } from "recoil";
import { themeState } from "@/store/atoms/theme";

const Projects = () => {
  return (
    <div className="flex flex-col items-start justify-start w-full my-4 gap-3">
      <h2 className="font-semibold text-sm">RECENT PROJECTS</h2>
      <div className="grid sm:grid-cols-2 grid-cols-1 flex-wrap w-full gap-3">
        {projectData.map((project, idx) => (
          <ProjectCard key={idx} project={project} />
        ))}
      </div>
      <div className="flex w-full items-center justify-end gap-3">
        You can find more projects on
        <Link
          className="flex items-center justify-end gap-3 hover:underline text-sky-500"
          href="https://github.com/kjxcodez?tab=repositories"
        >
          My Github <SquareArrowOutUpRight size={18} />
        </Link>
      </div>
    </div>
  );
};

export default Projects;

const ProjectCard = ({
  project,
}: {
  project: {
    name: string;
    desc: string;
    link: string;
    repo?: string;
    imageDark: StaticImageData;
    imageLight: StaticImageData;
    tech: string[];
    currentlyWorking?: boolean;
  };
}) => {
  const theme = useRecoilValue(themeState);
  return (
    <div className="flex flex-col col-span-1 overflow-hidden rounded-xl border w-full h-full backdrop-blur-xl">
      {theme === "dark" ? (
        <Image
          src={project.imageDark}
          alt={project.name}
          className="hover:scale-105 transition-transform duration-500 delay-300 w-full aspect-video h-auto"
        />
      ) : (
        <Image
          src={project.imageLight}
          alt={project.name}
          className="hover:scale-105 transition-transform duration-500 delay-300 w-full aspect-video h-auto"
        />
      )}

      <div className="flex flex-col items-start justify-start text-start px-4 gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          <h3 className="font-bold text-base mt-5 text-start">
            {project.name}
          </h3>
          {project.currentlyWorking ? (
            <Badge>Work in progress..</Badge>
          ) : (
            <div className="flex items-center justify-end gap-4">
              <Link href={project.link} target="_blank">
                <SquareArrowOutUpRight size={18} />
              </Link>
              {project.repo && (
                <Link href={project.repo} target="_blank">
                  <DiGithubBadge size={25} />
                </Link>
              )}
            </div>
          )}
        </div>
        <p className="opacity-80 text-sm">
          {project.desc.length > 200
            ? project.desc.slice(0, 200) + "..."
            : project.desc}
        </p>
        <div className="flex items-center justify-start gap-3 w-full flex-wrap my-3">
          {project.tech.map((technology, idx) => (
            <Badge key={idx}>{technology}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

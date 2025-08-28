"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from "@heroui/react";
import { FaCheckCircle, FaRegClipboard } from "react-icons/fa";
import { IoBarChart, IoCheckmarkCircleOutline } from "react-icons/io5";
import { PiDotsThreeBold } from "react-icons/pi";
import { RiProgress3Line } from "react-icons/ri";

const Dashboard = () => {
  return (
    <section>
      <div>
        <Card className="w-full">
          <CardHeader className="flex items-center gap-3">
            <IoBarChart className="text-xl text-[#124170]" />
            <div className="flex flex-col">
              <p className="text-md font-semibold">Task Chart</p>
              <small className="text-small text-default-500">
                Overall progress
              </small>
            </div>
          </CardHeader>

          <CardBody className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">✅ Completed</span>
              <span className="font-semibold text-success">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">⏳ In Progress</span>
              <span className="font-semibold text-warning">5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-default-600">📝 Not Started</span>
              <span className="font-semibold text-danger">8</span>
            </div>
          </CardBody>

          <CardFooter className="flex justify-end text-xs text-default-400">
            Updated: 08/28/2025
          </CardFooter>
        </Card>
      </div>
      <div className="flex items-center justify-center py-8 md:py-7">
        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 
      w-full max-w-7xl"
        >
          <Card className="w-full">
            <CardHeader className="flex-col items-start">
              <div className="flex items-center gap-1 pb-5 text-medium text-[#124170] font-bold">
                <div>
                  <FaRegClipboard />
                </div>
                <div>
                  <h1>To-Do</h1>
                </div>
              </div>
              <div className="flex justify-between gap-1">
                <p className="text-sm font-semibold mr-1">28 Aug</p>
                <p
                  className="text-small text-default-500 
              before:content-['•'] before:mr-1"
                >
                  Today
                </p>
              </div>
            </CardHeader>

            <CardBody className="flex flex-col gap-2 px-5">
              <Card className="border border-gray-500 rounded-md">
                <CardHeader className="flex justify-between gap-3">
                  <h5 className="font-semibold text-wrap">
                    Design Dashboard Layout
                  </h5>
                  <Dropdown>
                    <DropdownTrigger>
                      <PiDotsThreeBold className="font-bold text-lg" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="in_progress" className="px-2 py-1">
                        <div className="flex items-center gap-2 text-primary">
                          <RiProgress3Line className="text-lg" />
                          <span>Mark as In Progress</span>
                        </div>
                      </DropdownItem>
                      <DropdownItem key="completed" className="px-2 py-1">
                        <div className="flex items-center gap-2 text-success">
                          <IoCheckmarkCircleOutline className="text-lg" />
                          <span>Mark as Completed</span>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>
                <CardBody className="flex flex-row justify-between sm:gap-2">
                  <div className="flex-1">
                    {" "}
                    Create a responsive dashboard layout with sidebar
                    navigation, top navbar screens...
                  </div>
                  <Image
                    alt="mock image"
                    height={90}
                    radius="sm"
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
                    width={100}
                    className="shrink-0"
                  />
                </CardBody>
                <CardFooter className="flex-col-3 gap-4 text-sm">
                  <div>
                    <p>
                      Priority: <span className="text-blue-500">Moderate</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Status:{" "}
                      <span className="text-orange-800">Not Started</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Created at:{" "}
                      <span className="text-[#1f5d3c]">08/28/2025</span>
                    </p>
                  </div>
                </CardFooter>
              </Card>
              <Card className="border border-gray-500 rounded-md">
                <CardHeader className="flex justify-between gap-3">
                  <h5 className="font-semibold text-wrap">
                    Create UI for my project
                  </h5>
                  <Dropdown>
                    <DropdownTrigger>
                      <PiDotsThreeBold className="font-bold text-lg" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="completed" className="px-2 py-1">
                        <div className="flex items-center gap-2 text-success">
                          <IoCheckmarkCircleOutline className="text-lg" />
                          <span>Mark as Completed</span>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>
                <CardBody className="flex flex-row justify-between sm:gap-2">
                  <div className="flex-1">
                    {" "}
                    Make sure the navbar works properly on mobile, tablet, and
                    desktop screens...
                  </div>
                  <Image
                    alt="mock image"
                    height={90}
                    radius="sm"
                    src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
                    width={100}
                    className="shrink-0"
                  />
                </CardBody>
                <CardFooter className="flex-col-3 gap-4 text-sm">
                  <div>
                    <p>
                      Priority: <span className="text-blue-500">Moderate</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Status:{" "}
                      <span className="text-orange-800">In Progress</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Created at:{" "}
                      <span className="text-[#1f5d3c]">08/28/2025</span>
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </CardBody>
          </Card>

          <Card className="w-full">
            <CardHeader className="flex-col items-start">
              <div className="flex items-center gap-1 pb-5 text-medium text-[#124170] font-semibold">
                <FaCheckCircle className="text-lg" />
                <h1>Completed Tasks</h1>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold">28 Aug</p>
                <p
                  className="text-small text-default-500 
      before:content-['•'] before:mr-1"
                >
                  Today
                </p>
              </div>
            </CardHeader>

            <CardBody className="flex flex-col gap-2 px-7">
              <Card className="border border-gray-500 rounded-md">
                <CardHeader className="flex justify-between gap-3">
                  <h5 className="font-semibold text-wrap">
                    Set Up Project Documentation
                  </h5>
                  <Dropdown>
                    <DropdownTrigger>
                      <PiDotsThreeBold className="font-bold text-lg" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="completed" className="px-2 py-1">
                        <div className="flex items-center gap-2 text-success">
                          <IoCheckmarkCircleOutline className="text-lg" />
                          <span>Mark as Completed</span>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>
                <CardBody className="flex flex-row justify-between sm:gap-2">
                  <div className="flex-1">
                    Write clear and structured documentation covering
                    installation, project structure, and API usage...
                  </div>
                  <Image
                    alt="auth flow mockup"
                    height={90}
                    radius="sm"
                    src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop"
                    width={100}
                    className="shrink-0"
                  />
                </CardBody>
                <CardFooter className="flex justify-between items-start gap-0 text-sm">
                  <div>
                    <p>
                      Status:{" "}
                      <span className="text-success font-semibold">
                        Completed
                      </span>
                    </p>
                  </div>
                  <div>
                    <small>Completed 2 days ago</small>
                  </div>
                </CardFooter>
              </Card>
              <Card className="border border-gray-500 rounded-md">
                <CardHeader className="flex justify-between gap-3">
                  <h5 className="font-semibold text-wrap">
                    Build Authentication Flow
                  </h5>
                  <Dropdown>
                    <DropdownTrigger>
                      <PiDotsThreeBold className="font-bold text-lg" />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Static Actions">
                      <DropdownItem key="completed" className="px-2 py-1">
                        <div className="flex items-center gap-2 text-success">
                          <IoCheckmarkCircleOutline className="text-lg" />
                          <span>Mark as Completed</span>
                        </div>
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </CardHeader>
                <CardBody className="flex flex-row justify-between sm:gap-2">
                  <div className="flex-1">
                    Implement login, signup, and logout with JWT authentication
                    and secure password hashing...
                  </div>
                  <Image
                    alt="auth flow mockup"
                    height={90}
                    radius="sm"
                    src="https://images.unsplash.com/photo-1529101091764-c3526daf38fe?w=400&h=300&fit=crop"
                    width={100}
                    className="shrink-0"
                  />
                </CardBody>
                <CardFooter className="flex justify-between gap-0 text-sm">
                  <div>
                    <p>
                      Status:{" "}
                      <span className="text-success font-semibold">
                        Completed
                      </span>
                    </p>
                  </div>
                  <div>
                    <small>Completed 4 days ago</small>
                  </div>
                </CardFooter>
              </Card>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

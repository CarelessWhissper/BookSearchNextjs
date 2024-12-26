"use client";

import React from "react";
import { Card, Space, Avatar, Typography, Divider } from "antd";
import { GithubOutlined, LinkedinOutlined, BookOutlined } from "@ant-design/icons";

const { Title, Paragraph, Link } = Typography;

const About = () => {
  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Main Info Card */}
        <Card
          title={
            <Title level={2} style={{ color: "#704d37", margin: 0 }}>
              <BookOutlined style={{ marginRight: "8px" }} />
              Book Finder
            </Title>
          }
          bordered={false}
          style={{ borderRadius: "8px" }}
        >
          <Paragraph style={{ fontSize: "16px" }}>
            Welcome to <strong>Book Finder</strong>, your one-stop application for discovering books quickly and easily! 
            This app allows users to search for books by title and access essential details, such as the author, 
            publication year, genre, and description. Whether you're looking for your next read or exploring book information, 
            Book Finder is here to help.
          </Paragraph>
          <Paragraph style={{ fontSize: "16px" }}>
            The application is powered by the{" "}
            <Link href="https://openlibrary.org/" target="_blank" style={{ color: "#704d37" }}>
              Open Library API
            </Link>
            , a free and open platform for book enthusiasts. It ensures accurate and up-to-date book data for an excellent user experience.
          </Paragraph>
        </Card>

        {/* Developer Info Card */}
        <Card
          title={
            <Title level={2} style={{ color: "#704d37", margin: 0 }}>
              About the Developer
            </Title>
          }
          bordered={false}
          style={{ borderRadius: "8px" }}
        >
          <Space align="start" size="large">
            <Avatar
              size={100}
              style={{ backgroundColor: "#704d37", color: "#dfc778" }}
            >
              MC
            </Avatar>
            <Space direction="vertical">
              <Title level={3} style={{ margin: 0, color: "#704d37" }}>
                Marc Codrington
              </Title>
              <Paragraph style={{ fontSize: "16px", marginTop: "8px" }}>
                Hi, I'm a passionate software developer and UI/UX designer based in Paramaribo, Suriname. 
                I specialize in building user-friendly and visually appealing applications, leveraging my skills in JavaScript, 
                React, Next.js, and other modern web technologies.
              </Paragraph>
              <Paragraph style={{ fontSize: "16px" }}>
                As a student of Software Engineering at UNASAT, I'm committed to learning and creating impactful solutions. 
                Book Finder is a demonstration of my dedication to crafting practical, efficient, and beautiful applications.
              </Paragraph>
            </Space>
          </Space>

          <Divider />

          {/* Social Links */}
          <Space size="large">
            <Link href="https://www.linkedin.com/in/marccodrington/" target="_blank">
              <Card
                size="small"
                style={{ backgroundColor: "#704d37", borderRadius: "4px" }}
              >
                <Space>
                  <LinkedinOutlined style={{ color: "#dfc778", fontSize: "20px" }} />
                  <span style={{ color: "#dfc778" }}>LinkedIn Profile</span>
                </Space>
              </Card>
            </Link>
            <Link href="https://github.com/CarelessWhissper" target="_blank">
              <Card
                size="small"
                style={{ backgroundColor: "#704d37", borderRadius: "4px" }}
              >
                <Space>
                  <GithubOutlined style={{ color: "#dfc778", fontSize: "20px" }} />
                  <span style={{ color: "#dfc778" }}>GitHub Repository</span>
                </Space>
              </Card>
            </Link>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

export default About;
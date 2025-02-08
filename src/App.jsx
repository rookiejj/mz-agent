import React, { useState, useRef } from "react";
import { Home, Building2, Users, MessageCircle, User } from "lucide-react";
import { TrendingUp, Star, MapPin, DollarSign, Clock } from "lucide-react";

import "./App.css";

// 1. Common Components

const PageHeader = ({
  title,
  onBack,
  backButtonVisible = false,
  rightComponent,
  showLocationButton,
  currentLocation,
  onLocationSelect,
}) => (
  <div
    style={{
      padding: "1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <div style={{ display: "flex", alignItems: "center" }}>
      {backButtonVisible && (
        <button onClick={onBack} className="back-button">
          ←
        </button>
      )}
      <h1
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          marginLeft: backButtonVisible ? "0.5rem" : "0",
        }}
      >
        {title}
      </h1>
    </div>

    {showLocationButton ? (
      <button
        onClick={onLocationSelect}
        style={{
          backgroundColor: "#dbeafe",
          padding: "0.5rem 1rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          color: "black",
          fontSize: "0.875rem",
          whiteSpace: "nowrap",
        }}
      >
        📍 {currentLocation}
      </button>
    ) : rightComponent ? (
      rightComponent
    ) : null}
  </div>
);

const LocationSelectButton = ({ currentLocation, onLocationSelect }) => (
  <button className="location-button" onClick={onLocationSelect}>
    📍 {currentLocation}
  </button>
);

const BottomNavigation = ({ currentPage, onNavigate }) => (
  <div className="bottom-navigation">
    <div className="bottom-navigation-inner">
      <button
        onClick={() => onNavigate("main")}
        className={`nav-button ${
          currentPage === "main" ? "nav-button-active" : "nav-button-inactive"
        }`}
      >
        <Home size={20} />
        <span>홈</span>
      </button>
      <button
        onClick={() => onNavigate("gyms")}
        className={`nav-button ${
          currentPage === "gyms" ? "nav-button-active" : "nav-button-inactive"
        }`}
      >
        <Building2 size={20} />
        <span>운동시설</span>
      </button>
      <button
        onClick={() => onNavigate("trainers")}
        className={`nav-button ${
          currentPage === "trainers"
            ? "nav-button-active"
            : "nav-button-inactive"
        }`}
      >
        <Users size={20} />
        <span>트레이너</span>
      </button>
      <button
        onClick={() => onNavigate("community")}
        className={`nav-button ${
          currentPage === "community"
            ? "nav-button-active"
            : "nav-button-inactive"
        }`}
      >
        <MessageCircle size={20} />
        <span>커뮤니티</span>
      </button>
      <button
        onClick={() => onNavigate("mypage")}
        className={`nav-button ${
          currentPage === "mypage" ? "nav-button-active" : "nav-button-inactive"
        }`}
      >
        <User size={20} />
        <span>MY</span>
      </button>
    </div>
  </div>
);

// 2. Main Pages
const MainPage = ({ onNavigate, currentLocation }) => {
  return (
    <div className="container">
      <PageHeader
        title="몬짐 에이전트"
        showLocationButton={true}
        currentLocation={currentLocation}
        onLocationSelect={() => onNavigate("location")}
      />{" "}
      <div
        style={{
          flex: 1,
          padding: "1rem 1rem 5rem 1rem",
          position: "relative",
        }}
      >
        {" "}
        {/* Quick Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: "0.75rem",
            marginBottom: "1.5rem",
          }}
        >
          <StatsCard
            icon={<Users size={20} />}
            label="이용 회원"
            value="2,841명"
          />
          <StatsCard
            icon={<TrendingUp size={20} />}
            label="제휴 시설"
            value="267개"
          />
          <StatsCard
            icon={<Star size={20} />}
            label="평균 평점"
            value="4.8점"
          />
        </div>
        {/* Featured Sections */}
        <div style={{ marginBottom: "1.5rem" }}>
          <SectionHeader
            title="추천 운동시설"
            onViewAll={() => onNavigate("gyms")}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <FeaturedGymCard
              name="스포애니 강남점"
              rating={4.9}
              location="강남구 역삼동"
              price="89,000"
              onClick={() => onNavigate("gymDetail", { id: 1 })}
            />
            <FeaturedGymCard
              name="24핏 선릉점"
              rating={4.8}
              location="강남구 역삼동"
              price="79,000"
              onClick={() => onNavigate("gymDetail", { id: 2 })}
            />
          </div>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <SectionHeader
            title="인기 트레이너"
            onViewAll={() => onNavigate("trainers")}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            <TrainerCard
              name="김승현"
              specialty="체중감량"
              rating={4.9}
              experience="5년"
              onClick={() => onNavigate("trainerDetail", { id: 1 })}
            />
            <TrainerCard
              name="이지원"
              specialty="근력강화"
              rating={4.8}
              experience="7년"
              onClick={() => onNavigate("trainerDetail", { id: 2 })}
            />
          </div>
        </div>
        <div style={{ marginBottom: "1.5rem" }}>
          <SectionHeader
            title="인기 게시글"
            onViewAll={() => onNavigate("community")}
          />
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <CommunityPostCard
              title="40대 직장인의 성공적인 다이어트 후기"
              author="헬스왕"
              likes={142}
              comments={38}
              onClick={() => onNavigate("communityDetail", { id: 1 })}
            />
            <CommunityPostCard
              title="PT 트레이너가 알려주는 식단 관리 팁"
              author="프로트레이너"
              likes={98}
              comments={27}
              onClick={() => onNavigate("communityDetail", { id: 2 })}
            />
          </div>
        </div>
      </div>
      <BottomNavigation currentPage="main" onNavigate={onNavigate} />
    </div>
  );
};

const SectionHeader = ({ title, onViewAll }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    }}
  >
    <h2
      style={{
        fontSize: "1.125rem",
        fontWeight: "bold",
      }}
    >
      {title}
    </h2>
    <button
      onClick={onViewAll}
      className="primary-button"
      style={{
        width: "auto",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
      }}
    >
      전체보기
    </button>
  </div>
);

const StatsCard = ({ icon, label, value }) => (
  <div
    className="card"
    style={{
      backgroundColor: "#dbeafe",
      padding: "0.75rem",
      borderRadius: "0.75rem",
      textAlign: "center",
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#3b82f6",
        width: "2rem",
        height: "2rem",
        borderRadius: "0.5rem",
        marginBottom: "0.5rem",
        marginLeft: "auto",
        marginRight: "auto",
        color: "white",
      }}
    >
      {icon}
    </div>
    <div
      style={{
        fontSize: "0.75rem",
        color: "#4b5563",
        marginBottom: "0.25rem",
      }}
    >
      {label}
    </div>
    <div
      style={{
        fontSize: "1.125rem",
        fontWeight: "bold",
        color: "#1e3a8a",
      }}
    >
      {value}
    </div>
  </div>
);

const FeaturedGymCard = ({ name, rating, location, price, onClick }) => (
  <button
    onClick={onClick}
    className="card gym-trainer-item"
    style={{
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      padding: "0.75rem",
    }}
  >
    <div className="gym-trainer-item-image" />
    <div className="gym-trainer-item-content">
      <h3 style={{ fontWeight: "bold", margin: 0 }}>{name}</h3>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          color: "#fbbf24",
          marginTop: "0.25rem",
        }}
      >
        <Star size={16} style={{ marginRight: "0.25rem" }} />
        <span style={{ fontSize: "0.875rem" }}>{rating}</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          marginTop: "0.25rem",
          color: "#6b7280",
          fontSize: "0.875rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <MapPin size={16} style={{ marginRight: "0.25rem" }} />
          <span>{location}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DollarSign size={16} style={{ marginRight: "0.25rem" }} />
          <span>{price}원/월</span>
        </div>
      </div>
    </div>
  </button>
);

const TrainerCard = ({ name, specialty, rating, experience, onClick }) => (
  <button
    onClick={onClick}
    className="card"
    style={{
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
      padding: "0.75rem",
    }}
  >
    <div
      className="gym-trainer-item-image"
      style={{ marginBottom: "0.75rem" }}
    />
    <h3 style={{ fontWeight: "bold", margin: 0 }}>{name}</h3>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        color: "#fbbf24",
        margin: "0.25rem 0",
      }}
    >
      <Star size={16} style={{ marginRight: "0.25rem" }} />
      <span style={{ fontSize: "0.875rem" }}>{rating}</span>
    </div>
    <div style={{ fontSize: "0.875rem", color: "#6b7280" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "0.25rem",
        }}
      >
        <Users size={16} style={{ marginRight: "0.25rem" }} />
        <span>{specialty}</span>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Clock size={16} style={{ marginRight: "0.25rem" }} />
        <span>경력 {experience}</span>
      </div>
    </div>
  </button>
);

const CommunityPostCard = ({ title, author, likes, comments, onClick }) => (
  <button
    onClick={onClick}
    className="card community-post"
    style={{
      width: "100%",
      textAlign: "left",
      cursor: "pointer",
    }}
  >
    <h3
      style={{
        fontWeight: "bold",
        marginBottom: "0.5rem",
      }}
    >
      {title}
    </h3>
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.875rem",
      }}
    >
      <span style={{ color: "#6b7280" }}>{author}</span>
      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          color: "#6b7280",
        }}
      >
        <span>👍 {likes}</span>
        <span>💬 {comments}</span>
      </div>
    </div>
  </button>
);

const LocationPage = ({ onNavigate }) => {
  const [selectedCity, setSelectedCity] = React.useState(null);

  const cities = [
    { id: "seoul", name: "서울" },
    { id: "gyeonggi", name: "경기" },
    { id: "incheon", name: "인천" },
    { id: "busan", name: "부산" },
    { id: "daegu", name: "대구" },
  ];

  const districts = {
    seoul: ["강남구", "서초구", "송파구", "강동구", "마포구"],
    gyeonggi: ["수원시", "성남시", "고양시", "용인시", "부천시"],
    incheon: ["중구", "동구", "미추홀구", "연수구", "남동구"],
    busan: ["중구", "서구", "동구", "영도구", "부산진구"],
    daegu: ["중구", "동구", "서구", "남구", "북구"],
  };

  if (!selectedCity) {
    return (
      <div className="container">
        <PageHeader
          title="지역 선택"
          onBack={() => onNavigate("back")}
          backButtonVisible={true}
        />
        <div style={{ flex: 1, padding: "1rem" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
            }}
          >
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city)}
                className="location-selection-button"
              >
                {city.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <PageHeader
        title={`${selectedCity.name} 지역 선택`}
        onBack={() => setSelectedCity(null)}
        backButtonVisible={true}
      />
      <div style={{ flex: 1, padding: "1rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
          }}
        >
          {districts[selectedCity.id].map((district) => (
            <button
              key={district}
              onClick={() =>
                onNavigate("back", {
                  selectedLocation: `${selectedCity.name} ${district}`,
                })
              }
              className="location-selection-button"
              style={{
                textAlign: "center", // 중앙 정렬로 변경
                justifyContent: "center", // 추가: 플렉스 중앙 정렬
              }}
            >
              {district}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GymListPage = ({ onNavigate, currentLocation }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const contentRef = useRef(null);

  const tabs = [
    { id: 0, name: "헬스장" },
    { id: 1, name: "필라테스" },
    { id: 2, name: "주짓수" },
  ];

  const gymData = {
    헬스장: Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      name: `스포애니 ${i + 1}호점`,
      location: "강남구 역삼동",
      rating: 4.5,
      price: "80,000",
    })),
    필라테스: Array.from({ length: 4 }, (_, i) => ({
      id: i + 1,
      name: `코어필라테스 ${i + 1}호점`,
      location: "강남구 역삼동",
      rating: 4.8,
      price: "150,000",
    })),
    주짓수: Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      name: `그레이시바하 ${i + 1}호점`,
      location: "강남구 역삼동",
      rating: 4.7,
      price: "120,000",
    })),
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeTab < tabs.length - 1) {
      setActiveTab((prev) => prev + 1);
    }
    if (isRightSwipe && activeTab > 0) {
      setActiveTab((prev) => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="container">
      <PageHeader
        title="운동시설 목록"
        showLocationButton={true}
        currentLocation={currentLocation}
        onLocationSelect={() => onNavigate("location")}
      />

      <div style={{ position: "relative", flex: 1, overflowY: "hidden" }}>
        {/* Tabs */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            zIndex: 10,
            borderBottom: "1px solid #e5e7eb",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "4px",
              padding: "8px",
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s",
                  backgroundColor: activeTab === tab.id ? "#3b82f6" : "#f3f4f6",
                  color: activeTab === tab.id ? "white" : "#4b5563",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          ref={contentRef}
          style={{
            height: "100%",
            overflowY: "auto",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              padding: "0.5rem 0.5rem 1.5rem",
            }}
          >
            {gymData[tabs[activeTab].name].map((gym) => (
              <button
                key={gym.id}
                onClick={() => onNavigate("gymDetail", { id: gym.id })}
                className="card gym-trainer-item"
                style={{ textAlign: "left", cursor: "pointer" }}
              >
                <div className="gym-trainer-item-image" />
                <div className="gym-trainer-item-content">
                  <h3 style={{ fontWeight: "bold", margin: 0 }}>{gym.name}</h3>
                  <p style={{ margin: "0.25rem 0" }}>{gym.location}</p>
                  <p style={{ margin: "0.25rem 0" }}>⭐️ {gym.rating}</p>
                  <p style={{ margin: "0.25rem 0" }}>{gym.price}원/월</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <BottomNavigation currentPage="gyms" onNavigate={onNavigate} />
    </div>
  );
};

const GymDetailPage = ({ onNavigate }) => {
  const membershipRef = useRef(null);
  const membershipPlans = [
    { duration: "3개월", price: "60,000원" },
    { duration: "6개월", price: "110,000원" },
    { duration: "12개월", price: "200,000원" },
  ];

  const scrollToMembership = () => {
    membershipRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlanClick = (plan) => {
    onNavigate("payment", { plan, source: "gym" });
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div className="detail-page-header">
        <button onClick={() => onNavigate("back")} className="back-button">
          ←
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          운동시설 상세
        </h1>
        <div style={{ width: "2rem" }} />
      </div>

      <div style={{ flex: 1, padding: "1rem 2rem", overflow: "auto" }}>
        <div className="detail-page-image" />
        <div style={{ marginBottom: "2.5rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            스마트 피트니스
          </h2>
          <p style={{ marginBottom: "0.25rem" }}>⭐️ 4.5</p>
          <p style={{ marginBottom: "0.25rem" }}>📍 강남구 역삼동</p>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            시설 정보
          </h3>
          <ul style={{ paddingLeft: "1.25rem", listStyle: "disc" }}>
            <li style={{ marginBottom: "0.25rem" }}>샤워실</li>
            <li style={{ marginBottom: "0.25rem" }}>운동복 대여</li>
            <li style={{ marginBottom: "0.25rem" }}>개인 락커</li>
            <li style={{ marginBottom: "0.25rem" }}>주차장</li>
          </ul>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            위치보기
          </h3>
          <div
            style={{
              backgroundColor: "#f3f4f6",
              borderRadius: "0.75rem",
              overflow: "hidden",
              padding: "1rem",
              maxWidth: "50%",
              margin: "0 auto",
            }}
          >
            <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
              {/* Background */}
              <rect width="400" height="200" fill="#e5e7eb" rx="8" />

              {/* Map Features */}
              <path
                d="M50 50 L350 50 L350 150 L50 150 Z"
                fill="#f3f4f6"
                stroke="#d1d5db"
                strokeWidth="2"
              />

              {/* Buildings */}
              <rect x="120" y="60" width="30" height="20" fill="#d1d5db" />
              <rect x="170" y="60" width="25" height="30" fill="#d1d5db" />
              <rect x="230" y="85" width="40" height="25" fill="#d1d5db" />
              <rect x="120" y="100" width="35" height="35" fill="#d1d5db" />
              <rect x="280" y="60" width="30" height="40" fill="#d1d5db" />

              {/* Roads */}
              <path d="M100 50 L100 150" stroke="#9ca3af" strokeWidth="2" />
              <path d="M200 50 L200 150" stroke="#9ca3af" strokeWidth="2" />
              <path d="M300 50 L300 150" stroke="#9ca3af" strokeWidth="2" />
              <path d="M50 75 L350 75" stroke="#9ca3af" strokeWidth="2" />
              <path d="M50 125 L350 125" stroke="#9ca3af" strokeWidth="2" />

              {/* Location Pin */}
              <g transform="translate(200,100)">
                {/* Pin Shadow */}
                <ellipse cx="0" cy="2" rx="8" ry="4" fill="rgba(0,0,0,0.2)" />

                {/* Pin Body */}
                <path
                  d="M0,-25 C11,-25 20,-15.5 20,-4 C20,7.5 0,25 0,25 C0,25 -20,7.5 -20,-4 C-20,-15.5 -11,-25 0,-25"
                  fill="#ef4444"
                  stroke="#dc2626"
                  strokeWidth="2"
                />

                {/* Pin Center */}
                <circle cx="0" cy="-4" r="6" fill="white" />
              </g>

              {/* Scale Indicator */}
              <g transform="translate(60,170)">
                <line
                  x1="0"
                  y1="0"
                  x2="50"
                  y2="0"
                  stroke="#6b7280"
                  strokeWidth="2"
                />
                <text
                  x="25"
                  y="15"
                  fontSize="10"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  100m
                </text>
              </g>

              {/* North Indicator */}
              <g transform="translate(340,30)">
                <circle
                  cx="0"
                  cy="0"
                  r="15"
                  fill="white"
                  stroke="#6b7280"
                  strokeWidth="1"
                />
                <text
                  x="0"
                  y="5"
                  fontSize="12"
                  fill="#6b7280"
                  textAnchor="middle"
                >
                  N
                </text>
              </g>
            </svg>
          </div>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              marginTop: "0.5rem",
            }}
          >
            📍 서울특별시 강남구 역삼동 123-45
          </p>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            ref={membershipRef}
            style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
          >
            멤버십 요금
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {membershipPlans.map((plan) => (
              <div
                key={plan.duration}
                onClick={() => handlePlanClick(plan)}
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "black",
                      fontWeight: "500",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {plan.duration}
                  </div>
                  <div style={{ color: "#3b82f6", fontWeight: "bold" }}>
                    {plan.price}/월
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanClick(plan);
                  }}
                  style={{
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    marginLeft: "1rem",
                  }}
                >
                  결제하기
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="detail-page-footer">
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={scrollToMembership} className="primary-button">
            요금보기
          </button>
          <button className="primary-button">전화걸기</button>
          <button className="primary-button">전화받기</button>
        </div>
      </div>
    </div>
  );
};

const TrainerListPage = ({ onNavigate, currentLocation }) => (
  <div className="container">
    <PageHeader
      title="트레이너 목록"
      showLocationButton={true}
      currentLocation={currentLocation}
      onLocationSelect={() => onNavigate("location")}
    />{" "}
    <div
      style={{ flex: 1, padding: "1rem 1rem 5rem 1rem", position: "relative" }}
    >
      {" "}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
          <button
            key={id}
            onClick={() => onNavigate("trainerDetail", { id })}
            className="card gym-trainer-item"
            style={{ textAlign: "left", cursor: "pointer" }}
          >
            <div className="gym-trainer-item-image" />
            <div className="gym-trainer-item-content">
              <h3 style={{ fontWeight: "bold", margin: 0 }}>김트레이너 {id}</h3>
              <p style={{ margin: "0.25rem 0" }}>체중감량, 근력강화</p>
              <p style={{ margin: "0.25rem 0" }}>⭐️ 4.8</p>
              <p style={{ margin: "0.25rem 0" }}>100,000원/회</p>
            </div>
          </button>
        ))}
      </div>
    </div>
    <BottomNavigation currentPage="trainers" onNavigate={onNavigate} />
  </div>
);

const TrainerDetailPage = ({ onNavigate }) => {
  const lessonRef = useRef(null);
  const lessonPlans = [
    {
      sessions: "30회",
      pricePerSession: "60,000원",
      totalPrice: "1,800,000원",
    },
    {
      sessions: "20회",
      pricePerSession: "70,000원",
      totalPrice: "1,400,000원",
    },
    { sessions: "10회", pricePerSession: "80,000원", totalPrice: "800,000원" },
  ];

  const scrollToLesson = () => {
    lessonRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePlanClick = (plan) => {
    onNavigate("payment", { plan, source: "trainer" });
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div className="detail-page-header">
        <button onClick={() => onNavigate("back")} className="back-button">
          ←
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          트레이너 상세
        </h1>
        <div style={{ width: "2rem" }} />
      </div>

      <div style={{ flex: 1, padding: "1rem 2rem", overflow: "auto" }}>
        <div className="detail-page-image" />
        <div style={{ marginBottom: "1.5rem" }}>
          <h2
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
            }}
          >
            김트레이너
          </h2>
          <p style={{ marginBottom: "0.25rem" }}>⭐️ 4.8</p>
          <p style={{ marginBottom: "0.25rem" }}>💪 체중감량, 근력강화</p>
          <p style={{ marginBottom: "0.25rem" }}>📝 경력 5년</p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>자격증</h3>
          <ul style={{ paddingLeft: "1.25rem", listStyle: "disc" }}>
            <li>생활스포츠지도사 2급</li>
            <li>NSCA-CPT</li>
            <li>KATA-PTS</li>
          </ul>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
            상담 가능 시간
          </h3>
          <p>평일 09:00 - 22:00</p>
        </div>

        <div style={{ marginBottom: "2.5rem" }}>
          <h3
            ref={lessonRef}
            style={{ fontWeight: "bold", marginBottom: "0.5rem" }}
          >
            레슨 요금
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            {lessonPlans.map((plan) => (
              <div
                key={plan.sessions}
                onClick={() => handlePlanClick(plan)}
                style={{
                  padding: "0.75rem",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "black",
                      fontWeight: "500",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {plan.sessions}
                  </div>
                  <div style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    회당 {plan.pricePerSession}
                  </div>
                  <div style={{ color: "#3b82f6", fontWeight: "bold" }}>
                    총 {plan.totalPrice}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlanClick(plan);
                  }}
                  style={{
                    padding: "0.5rem 0.75rem",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    border: "none",
                    borderRadius: "0.375rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    marginLeft: "1rem",
                  }}
                >
                  결제하기
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "1rem",
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          position: "sticky",
          bottom: 0,
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            onClick={scrollToLesson}
            className="primary-button"
            style={{ flex: 1 }}
          >
            요금보기
          </button>
          <button className="primary-button" style={{ flex: 1 }}>
            전화받기
          </button>
        </div>
      </div>
    </div>
  );
};

const MyPage = ({ onNavigate }) => (
  <div className="container">
    <PageHeader title="마이 페이지" />
    <div style={{ flex: 1, padding: "1rem 1rem", position: "relative" }}>
      <div className="card profile-section" style={{ marginBottom: "1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "1rem",
          }}
        >
          <div className="profile-avatar" />
          <div style={{ marginLeft: "1rem" }}>
            <h2 style={{ fontWeight: "bold", fontSize: "1.125rem" }}>헬스왕</h2>
            <p style={{ color: "#6b7280" }}>user@example.com</p>
          </div>
        </div>
        <button className="secondary-button">프로필 수정</button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div
          className="card profile-section"
          style={{ marginBottom: "1.5rem" }}
        >
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">내 이용권</span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">결제 내역</span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">예약 내역</span>
            <span className="mypage-card-button-icon">→</span>
          </button>
        </div>

        <div
          className="card profile-section"
          style={{ marginBottom: "1.5rem" }}
        >
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">공지사항</span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">자주 묻는 질문</span>
            <span className="mypage-card-button-icon">→</span>
          </button>
          <button className="mypage-card-button">
            <span className="mypage-card-button-text">1:1 문의</span>
            <span className="mypage-card-button-icon">→</span>
          </button>
        </div>

        <button
          style={{
            width: "100%",
            padding: "1rem",
            textAlign: "left",
            color: "#ef4444",
            backgroundColor: "white",
            borderRadius: "0.75rem",
            border: "none",
            cursor: "pointer",
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
    <BottomNavigation currentPage="mypage" onNavigate={onNavigate} />
  </div>
);

const CommunityPage = ({ onNavigate, currentLocation }) => (
  <div className="container">
    <PageHeader
      title="커뮤니티"
      showLocationButton={true}
      currentLocation={currentLocation}
      onLocationSelect={() => onNavigate("location")}
    />{" "}
    <div
      style={{ flex: 1, padding: "1rem 1rem 5rem 1rem", position: "relative" }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((id) => (
          <button
            key={id}
            onClick={() => onNavigate("communityDetail", { id })}
            className="card community-post"
            style={{ width: "100%", textAlign: "left" }}
          >
            <h3>운동 초보자 PT 추천해주세요 {id}</h3>
            <div>
              <span>헬린이</span>
              <span>2024-02-06</span>
            </div>
            <div>
              <span>👍 24</span>
              <span>💬 12</span>
            </div>
          </button>
        ))}
      </div>
      <button
        className="community-create-button"
        onClick={() => onNavigate("communityCreate")}
      >
        +
      </button>{" "}
    </div>
    <BottomNavigation currentPage="community" onNavigate={onNavigate} />
  </div>
);

const CommunityDetailPage = ({ onNavigate }) => {
  const [comment, setComment] = React.useState("");

  const handleSubmitComment = () => {
    if (comment.trim()) {
      // 댓글 제출 로직
      setComment("");
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 10,
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <button onClick={() => onNavigate("back")} className="back-button">
          ←
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          게시글 상세
        </h1>
        <div style={{ width: "2rem" }} />
      </div>

      <div
        style={{
          flex: 1,
          padding: "1.5rem 2rem",
          height: "calc(100% - 8rem)",
          overflowY: "auto",
        }}
      >
        <div style={{ marginBottom: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "1rem",
            }}
          >
            <h2 style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
              운동 초보자 PT 추천해주세요
            </h2>
            <div style={{ display: "flex", gap: "1rem", color: "#6b7280" }}>
              <span>👍 24</span>
              <span>💬 12</span>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#6b7280",
              fontSize: "0.875rem",
              marginBottom: "1.5rem",
            }}
          >
            <span>헬린이</span>
            <span>2024-02-06</span>
          </div>
          <p style={{ lineHeight: "1.6", marginBottom: "2rem" }}>
            안녕하세요! 운동을 처음 시작하려고 하는데 PT를 받아보려고 합니다.
            제가 사는 곳 근처에 헬스장이 몇 군데 있는데, 어떤 기준으로 PT
            트레이너를 선택해야 할지 모르겠어요. 경험 있으신 분들의 조언
            부탁드립니다!
          </p>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>댓글 12</h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                style={{
                  padding: "1rem",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "0.5rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span style={{ fontWeight: "500" }}>운동매니아{idx + 1}</span>
                  <span style={{ color: "#6b7280", fontSize: "0.875rem" }}>
                    2024-02-06
                  </span>
                </div>
                <p style={{ lineHeight: "1.5" }}>
                  초보자라면 기초 자세부터 꼼꼼히 봐주실 수 있는 트레이너를
                  추천드립니다. 경력도 중요하지만 수업 스타일도 고려해보세요!
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "1rem 2rem",
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          position: "sticky",
          bottom: 0,
        }}
      >
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="댓글을 입력하세요"
            style={{
              flex: 1,
              padding: "0.75rem",
              border: "1px solid #e5e7eb",
              borderRadius: "0.5rem",
              outline: "none",
              fontSize: "0.875rem",
              backgroundColor: "white",
              color: "black",
            }}
          />
          <button
            onClick={handleSubmitComment}
            className="primary-button"
            style={{
              width: "auto",
              padding: "0.75rem 1.5rem",
              opacity: comment.trim() ? 1 : 0.5,
              cursor: comment.trim() ? "pointer" : "default",
              whiteSpace: "nowrap",
            }}
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

const CommunityCreatePage = ({ onNavigate }) => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleSubmit = () => {
    if (title.trim() && content.trim()) {
      onNavigate("back");
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <button onClick={() => onNavigate("back")} className="back-button">
          ←
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          글쓰기
        </h1>
        <button
          onClick={handleSubmit}
          className="primary-button"
          style={{
            width: "auto",
            padding: "0.5rem 1rem",
            opacity: title.trim() && content.trim() ? 1 : 0.5,
            cursor: title.trim() && content.trim() ? "pointer" : "default",
          }}
        >
          등록
        </button>
      </div>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem ",
          backgroundColor: "white",
        }}
      >
        {/* Title Input */}
        <div style={{ marginBottom: "1.5rem" }}>
          <input
            type="text"
            placeholder="제목을 입력하세요 (필수)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 0",
              fontSize: "1.125rem",
              border: "none",
              borderBottom: "1px solid #e5e7eb",
              outline: "none",
              backgroundColor: "white",
              color: "black",
            }}
          />
        </div>

        {/* Content Input */}
        <div>
          <textarea
            placeholder="내용을 입력하세요(필수)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              width: "100%",
              height: "50vh",
              boxSizing: "border-box",
              padding: "0.75rem 0.75rem",
              fontSize: "1rem",
              border: "1px solid #e5e7eb",
              borderRadius: 5,
              outline: "none",
              resize: "none",
              lineHeight: "1.5",
              backgroundColor: "white",
              color: "black",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentPage = ({ onNavigate, plan, source }) => {
  // source는 'gym' 또는 'trainer'를 값으로 가짐
  const renderPaymentInfo = () => {
    if (source === "gym") {
      return (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.5rem",
          }}
        >
          <p style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
            스마트 피트니스
          </p>
          <p
            style={{
              fontWeight: "bold",
              color: "#3b82f6",
              marginBottom: "0.5rem",
            }}
          >
            {plan.duration} 이용권
          </p>
          <p style={{ color: "#6b7280" }}>{plan.price}/월</p>
        </div>
      );
    } else if (source === "trainer") {
      return (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "#f3f4f6",
            borderRadius: "0.5rem",
          }}
        >
          <p style={{ fontWeight: "500", marginBottom: "0.5rem" }}>
            김트레이너
          </p>
          <p
            style={{
              fontWeight: "bold",
              color: "#3b82f6",
              marginBottom: "0.5rem",
            }}
          >
            {plan.sessions} PT 이용권
          </p>
          <div style={{ color: "#6b7280" }}>
            <p>회당 {plan.pricePerSession}</p>
            <p style={{ marginTop: "0.25rem" }}>총 {plan.totalPrice}</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      <div
        style={{
          padding: "1rem",
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "white",
          zIndex: 10,
        }}
      >
        <button onClick={() => onNavigate("back")} className="back-button">
          ←
        </button>
        <h1
          style={{
            flex: 1,
            textAlign: "center",
            fontSize: "1.25rem",
            fontWeight: "bold",
          }}
        >
          결제하기
        </h1>
        <div style={{ width: "2rem" }} />
      </div>

      <div style={{ flex: 1, padding: "1rem 2rem", overflow: "auto" }}>
        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            결제 상품
          </h3>
          {renderPaymentInfo()}
        </div>

        <div style={{ marginBottom: "2rem" }}>
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>
            결제 수단
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
          >
            <button className="secondary-button" style={{ padding: "1rem" }}>
              신용/체크카드
            </button>
            <button className="secondary-button" style={{ padding: "1rem" }}>
              무통장입금
            </button>
            <button className="secondary-button" style={{ padding: "1rem" }}>
              카카오페이
            </button>
          </div>
        </div>
      </div>

      <div
        style={{
          padding: "1rem",
          backgroundColor: "white",
          borderTop: "1px solid #e5e7eb",
          position: "sticky",
          bottom: 0,
        }}
      >
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button
            className="secondary-button"
            onClick={() => onNavigate("back")}
            style={{ flex: 1 }}
          >
            취소
          </button>
          <button className="primary-button" style={{ flex: 1 }}>
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = React.useState("main");
  const [navigationStack, setNavigationStack] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState("지역 선택");
  const [navigationParams, setNavigationParams] = React.useState({}); // 빈 객체로 초기화

  React.useEffect(() => {
    // 초기 히스토리 상태 설정
    window.history.replaceState({ page: "main", stack: [] }, "");

    const handlePopState = (event) => {
      const state = event.state;
      if (state) {
        setCurrentPage(state.page);
        setNavigationStack(state.stack || []);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const navigateTo = (page, params = {}) => {
    if (page === "back") {
      if (navigationStack.length > 0) {
        const newStack = [...navigationStack];
        const previousPage = newStack.pop();
        setNavigationStack(newStack);
        setCurrentPage(previousPage);
        window.history.pushState(
          {
            page: previousPage,
            stack: newStack,
          },
          ""
        );
      }
      if (params.selectedLocation) {
        setSelectedLocation(params.selectedLocation);
      }
    } else {
      const isMainPage = [
        "main",
        "gyms",
        "trainers",
        "community",
        "mypage",
      ].includes(page);
      let newStack;

      if (!isMainPage) {
        newStack = [...navigationStack, currentPage];
        setNavigationStack(newStack);
      } else {
        newStack = [];
        setNavigationStack(newStack);
      }

      setCurrentPage(page);
      setNavigationParams(params);

      window.history.pushState(
        {
          page: page,
          stack: newStack,
        },
        ""
      );
    }
  };

  const showBottomNav = [
    "main",
    "gyms",
    "trainers",
    "community",
    "mypage",
  ].includes(currentPage);

  const renderPage = () => {
    const commonProps = {
      onNavigate: navigateTo,
      currentLocation: selectedLocation,
    };

    switch (currentPage) {
      case "main":
        return <MainPage {...commonProps} />;
      case "location":
        return <LocationPage {...commonProps} />;
      case "gyms":
        return <GymListPage {...commonProps} />;
      case "gymDetail":
        return <GymDetailPage {...commonProps} />;
      case "trainers":
        return <TrainerListPage {...commonProps} />;
      case "trainerDetail":
        return <TrainerDetailPage {...commonProps} />;
      case "community":
        return <CommunityPage {...commonProps} />;
      case "communityDetail":
        return <CommunityDetailPage {...commonProps} />;
      case "communityCreate":
        return <CommunityCreatePage {...commonProps} />;
      case "mypage":
        return <MyPage {...commonProps} />;
      case "payment":
        return (
          <PaymentPage
            {...commonProps}
            plan={navigationParams.plan}
            source={navigationParams.source}
          />
        );
      default:
        return <MainPage {...commonProps} />;
    }
  };

  return (
    <div className="app-wrapper">
      {renderPage()}
      {showBottomNav && (
        <BottomNavigation currentPage={currentPage} onNavigate={navigateTo} />
      )}
    </div>
  );
};

export default App;

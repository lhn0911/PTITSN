import React from "react";
import "../Home.scss";
export default function MainRight({ currentUser, groups }: any) {
  return (
    <div className="main-right">
      <div className="user-info">
        {currentUser && (
          <div className="user-profile">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="user-img"
            />
            <div className="user-name">{currentUser.name}</div>
          </div>
        )}
        <div className="user-menu">
          <div className="user-menu-item">
            <i className="fa-solid fa-user-group"></i>
            Bạn bè
          </div>
          <div className="user-menu-item">
            <i className="fa-solid fa-calendar"></i>
            Kỷ niệm
          </div>
          <div className="user-menu-item">
            <i className="fa-solid fa-bookmark"></i>
            Đã lưu
          </div>
          <div className="user-menu-item">
            <span className="material-symbols-outlined">group</span>
            Nhóm
          </div>
          <div className="user-menu-item">
            <i className="fa-solid fa-tv"></i>
            Video
          </div>
          <div className="user-menu-item">
            <i className="fa-solid fa-arrow-down"></i>
            Xem thêm
          </div>
        </div>
      </div>
      <div className="user-activities">
        <h3>Lối tắt của bạn</h3>
        {groups.map((group: any) => (
          <div key={group.id} className="user-activity">
            <img src={group.image} alt={group.name} className="group-img" />
            {group.name}
          </div>
        ))}
      </div>
    </div>
  );
}

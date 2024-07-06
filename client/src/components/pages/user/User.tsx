import React from "react";

export default function User() {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body text-center">
              <img
                src="https://via.placeholder.com/150"
                className="rounded-circle mb-3"
                alt="User"
              />
              <h4>Hoàng Nam</h4>
              <button className="btn btn-primary btn-sm mx-2">
                Thêm vào tin
              </button>
              <button className="btn btn-secondary btn-sm mx-2">
                Chỉnh sửa trang cá nhân
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Những người bạn có thể biết</h5>
              <div className="d-flex flex-wrap">
                <div className="p-2 text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    className="rounded"
                    alt="Friend 1"
                  />
                  <p>Hoa Mặt Trời</p>
                  <button className="btn btn-primary btn-sm">
                    Thêm bạn bè
                  </button>
                </div>
                <div className="p-2 text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    className="rounded"
                    alt="Friend 2"
                  />
                  <p>Linh Trịnh</p>
                  <button className="btn btn-primary btn-sm">
                    Thêm bạn bè
                  </button>
                </div>
                <div className="p-2 text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    className="rounded"
                    alt="Friend 3"
                  />
                  <p>Đỗ Ngọc Khánh</p>
                  <button className="btn btn-primary btn-sm">
                    Thêm bạn bè
                  </button>
                </div>
                <div className="p-2 text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    className="rounded"
                    alt="Friend 4"
                  />
                  <p>Văn Cường</p>
                  <button className="btn btn-primary btn-sm">
                    Thêm bạn bè
                  </button>
                </div>
                <div className="p-2 text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    className="rounded"
                    alt="Friend 5"
                  />
                  <p>Anh Duy</p>
                  <button className="btn btn-primary btn-sm">
                    Thêm bạn bè
                  </button>
                </div>
                <div className="p-2 text-center">
                  <img
                    src="https://via.placeholder.com/50"
                    className="rounded"
                    alt="Friend 6"
                  />
                  <p>Bảy Sẹo</p>
                  <button className="btn btn-primary btn-sm">
                    Thêm bạn bè
                  </button>
                </div>
              </div>
              <a href="#" className="btn btn-link">
                Xem tất cả
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Giới thiệu</h5>
              <p className="card-text">Thử thách 30 ngày FA</p>
              <p className="card-text">Hôm nay là ngày thứ 6795</p>
              <button className="btn btn-primary btn-sm mx-1">
                Chỉnh sửa tiểu sử
              </button>
              <button className="btn btn-secondary btn-sm mx-1">
                Chỉnh sửa chi tiết
              </button>
              <button className="btn btn-success btn-sm mx-1">
                Thêm nội dung đáng chú ý
              </button>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Ảnh</h5>
              <div className="d-flex justify-content-around">
                <img
                  src="https://via.placeholder.com/50"
                  className="rounded"
                  alt="Ảnh 1"
                />
                <img
                  src="https://via.placeholder.com/50"
                  className="rounded"
                  alt="Ảnh 2"
                />
                <img
                  src="https://via.placeholder.com/50"
                  className="rounded"
                  alt="Ảnh 3"
                />
              </div>
              <a href="#" className="btn btn-link">
                Xem tất cả ảnh
              </a>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Bạn đang nghĩ gì?"
              />
              <div className="d-flex justify-content-around">
                <button className="btn btn-danger">Video trực tiếp</button>
                <button className="btn btn-success">Ảnh/video</button>
                <button className="btn btn-primary">Sự kiện trong đời</button>
              </div>
            </div>
          </div>
          <div className="card mt-3">
            <div className="card-body">
              <h5 className="card-title">Bài viết</h5>
              <p className="card-text">Không có bài viết</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

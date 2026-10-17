'use client';

import Link from 'next/link';
import { useSession } from '@/lib/session-provider';
import { useCourses } from '@/lib/use-courses';
import { Icon } from '@/components/icon';

export function StudentDashboard() {
  const { user, isDemo } = useSession();
  const { courses, loading, error } = useCourses();
  const current = courses.filter((course) => course.status === 'current');
  const completed = courses.filter((course) => course.status === 'completed');
  return (
    <main id="main-content" className="page-width main-content">
      <div className="breadcrumb">
        <Icon name="home" size={14} />
        <span>Trang chủ</span>
        <Icon name="chevron" size={12} />
        <span>Bảng điều khiển</span>
      </div>
      <div className="page-heading">
        <div>
          <p className="eyebrow">CHÀO MỪNG TRỞ LẠI</p>
          <h1>
            Xin chào, {user.fullName.split(' ').at(-1)}
            <span className="heading-dot">.</span>
          </h1>
          <p>Một ngày mới, một cơ hội để học thêm điều mới.</p>
        </div>
        <Link href="/" className="btn btn-primary button primary">
          Vào không gian học tập
          <Icon name="arrow" size={18} />
        </Link>
      </div>
      {loading ? (
        <div className="empty-state" role="status">
          Đang tải thông tin học tập…
        </div>
      ) : error ? (
        <div className="notice" role="alert">
          {error}
        </div>
      ) : (
        <>
          <div className="dashboard-stats">
            <div className="info-box stat-card">
              <span className="info-box-icon stat-icon">
                <Icon name="book" size={25} />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Tổng khóa học</span>
                <b>{courses.length}</b>
              </div>
            </div>
            <div className="info-box stat-card">
              <span className="info-box-icon stat-icon green">
                <Icon name="clock" size={25} />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Đang theo học</span>
                <b>{current.length}</b>
              </div>
            </div>
            <div className="info-box stat-card">
              <span className="info-box-icon stat-icon purple">
                <Icon name="cap" size={25} />
              </span>
              <div className="info-box-content">
                <span className="info-box-text">Đã hoàn thành</span>
                <b>{completed.length}</b>
              </div>
            </div>
          </div>
          <section className="card content-panel dashboard-courses">
            <div className="panel-title">
              <h2>Tiếp tục học tập</h2>
              <Link href="/">
                Xem tất cả
                <Icon name="arrow" size={16} />
              </Link>
            </div>
            {current.length ? (
              current.slice(0, 4).map((course) => (
                <Link className="continue-course" href={`/course/?id=${course.id}`} key={course.id}>
                  <span className={`mini-cover cover-${course.cover}`}>
                    <Icon name="book" size={25} />
                  </span>
                  <span className="continue-title">
                    <small>{course.code}</small>
                    <b>{course.title}</b>
                    <span>{course.semesterLabel}</span>
                  </span>
                  <span className="continue-progress">
                    {course.progress !== null && `${course.progress}% hoàn thành`}
                  </span>
                  <Icon name="arrow" size={20} />
                </Link>
              ))
            ) : (
              <div className="empty-state">
                <p>Chưa có khóa học đang diễn ra.</p>
              </div>
            )}
          </section>
        </>
      )}
      {isDemo && (
        <p className="demo-footnote">Các số liệu trên được tính từ danh sách khóa học minh họa.</p>
      )}
    </main>
  );
}

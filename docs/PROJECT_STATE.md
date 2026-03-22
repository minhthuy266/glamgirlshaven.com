# AI CONTEXT & PROJECT STATE: GlamGirls Haven 💅🇺🇸

**File Use:** BẤT KỲ AI/Trợ lý lập trình nào khi bắt đầu làm việc với dự án này đều PHẢI đọc file này ĐẦU TIÊN để lấy Context (bối cảnh) thay vì bắt User nhắc lại.

---

## 1. Thông tin cơ bản (Core Information)
- **Tên dự án:** GlamGirls Haven
- **Mục tiêu chính:** Blog kiếm tiền Affiliate thị trường Mỹ (US Market) nhắm mục tiêu 1,000 USD/tháng.
- **Sản phẩm trọng tâm:** Mỹ phẩm, Skincare, Dụng cụ làm đẹp (Từ Amazon Associates, Sephora, Ulta).
- **Email liên hệ:** `glamgirlshaven.blog@gmail.com`
- **Mạng xã hội DUY NHẤT:** Pinterest (`https://www.pinterest.com/glamgirlshaven/`). ĐÃ XÓA toàn bộ Instagram, Facebook, X, Youtube để tập trung nguồn lực kéo SEO hình ảnh.

## 2. Tech Stack (Công nghệ)
- **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS.
- **Animation:** Framer Motion (Lucide React cho Icons).
- **Backend / Headless CMS:** Ghost CMS.
  - API URL: `https://api.glamgirlshaven.com`
  - Tích hợp thông qua file `src/lib/ghost.ts`.

## 3. Hệ thống Curation (Nguyên tắc Hiển thị Trang chủ)
Trang chủ KHÔNG lấy bài ngẫu nhiên. Mọi vị trí đều được cấu hình kéo bài dựa trên **Tag (Slug)** gán trong Ghost Admin để duy trì phong cách "Tạp chí Luxury":

1. **`hero`**: Hình ảnh/Bìa nền cực lớn ở trên cùng. Chỉ nên có 1-2 bài mới nhất/kiếm tiền giỏi nhất.
2. **`editors-verdict`**: Phần "Hình vuông/Chữ nhật" đầu trang. Đây là CỖ MÁY IN TIỀN. Đề xuất: Bài so sánh Dupes, Top 5 list. (Chưa gán tag thì giao diện sẽ trống).
3. **`academy`**: Phần "Rituals Defined" (kiến thức Skincare). Mang dáng dấp Bác sĩ/Chuyên môn.
4. **`trending`**: Phần "The Gallery". Kéo hình ảnh đẹp nhất lên làm Pinterest bait.
5. **Feed `More to Explore` (Cuối trang chủ):** Lấy *Auto* toàn bộ các bài viết mới nhất phục vụ Internal Linking & SEO bot.

## 4. Đặc điểm Giao diện (UI/UX)
- Chế độ **Dark Mode / Light Mode** hoạt động trơn tru.
- "About Page" (`app/about/page.tsx`) đã bỏ tính cá nhân hóa (Founder/Face), biến đổi thành một **Tòa soạn (The Editorial Collective / GlamGirls Haven Editorial)** để tăng tín nhiệm người Mỹ.
- Contact Form & Footer đều link chuẩn về duy nhất 1 luồng: Mail và Pinterest đã chốt.
- Header (`src/components/layout/Header.tsx`): Có hiệu ứng trong suốt (Transparent) ở trang chủ khi ở đỉnh, và chuyển sang nền nhám đục (Glassmorphism + White/Dark) khi cuộn chuột.
- Search Form: Hoạt động mạnh mẽ, bung full màn hình đen/trắng cực kì Luxury.

## 5. Danh sách các tài liệu Chiến lược (Strategy Docs)
Nếu cần tham chiếu kịch bản xây dựng nội dung hoặc quy tắc viết bài ăn tiền, AI hãy đọc 3 file sau nằm trong folder `/docs/content-strategy/`:
1. `us_affiliate_strategy.md`: Tâm lý người Mỹ & Bí kíp viết bài chuyển đổi cao.
2. `home_page_governance.md`: Sơ đồ các tag và nguyên tắc lấp đầy trang chủ.
3. `content_fill_plan.md`: Đề xuất chi tiết bộ 10 bài viết đầu tiên cần gõ để trang web kín đẹp. (ĐÂY LÀ TASK CURRENT CỦA USER).

## 6. Lộ trình tiếp theo (To-dos for Future AI)
- **Status:** Kỹ thuật frontend 100% hoàn hảo và không có bugs hiển thị liên quan đến API.
- **Nếu user yêu cầu sửa giao diện:** TUYỆT ĐỐI không dùng lệnh ghi đè `replace block` quá rộng làm mất code cũ. Phải chú ý logic fallback của dữ liệu Ghost (nếu arr rỗng thì component có sập không?).
- **Tập trung:** Giúp user nghĩ ra content, format bài viết chuẩn HTML/Markdown cho Ghost, và tracking analytics/clicks.

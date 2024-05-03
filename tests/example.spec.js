const { test, expect } = require('@playwright/test');

test.describe('Tests for thegioididong.com', () => {
  test('has correct title', async ({ page }) => {
    // Đi tới trang chủ
    await page.goto('https://www.thegioididong.com/');

    // Kiểm tra tiêu đề của trang
    const pageTitle = await page.title();
    expect(pageTitle).toContain('Điện thoại, Laptop, Phụ kiện chính hãng');
  });

  test('search functionality', async ({ page }) => {
    // Đi tới trang chủ
    await page.goto('https://www.thegioididong.com/');

    // Nhập từ khóa tìm kiếm và tìm kiếm sản phẩm
    await page.fill('input[name="key"]', 'iPhone');
    await page.press('input[name="key"]', 'Enter');

    // Chờ cho trang tải lại sau khi tìm kiếm
    await page.waitForNavigation();

    // Kiểm tra xem trang hiển thị kết quả tìm kiếm có sản phẩm iPhone hay không
    const searchResults = await page.$$('.cat42 .item');
    expect(searchResults.length).toBeGreaterThan(0); // Kiểm tra có ít nhất một sản phẩm được tìm thấy
  });

  test('add product to cart', async ({ page }) => {
    // Đi tới trang sản phẩm
    await page.goto('https://www.thegioididong.com/dtdd');

    // Click vào nút "Mua Ngay" của sản phẩm đầu tiên
    const addToCartButton = await page.$('.product-item:not(.ads) button[data-role="add-to-cart"]');
    await addToCartButton.click();

    // Đi tới trang giỏ hàng
    await page.goto('https://www.thegioididong.com/cart');

    // Kiểm tra xem giỏ hàng có sản phẩm đã được thêm không
    const cartItems = await page.$$('.item-list .item');
    expect(cartItems.length).toBeGreaterThan(0); // Kiểm tra có ít nhất một sản phẩm trong giỏ hàng
  });

  // Thêm các test case khác tại đây nếu cần

});

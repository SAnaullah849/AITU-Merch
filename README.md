# AITU Merch

AITU Merch is a static, Bootstrap-based storefront and campus guide for the Astana IT University community. It uses the original project photographs in `assets/`. No custom JavaScript, order processing, ticketing, or database is included.

## Pages

| Page | Purpose |
| --- | --- |
| [Home](./index.html) | Introduces the collection, links to the shop and custom apparel, and routes visitors to campus information and events. |
| [Shop](./shop.html) | Shows four products and their listed prices, with an HTML-only order selection form. |
| [Events](./sunday-open.html) | Describes the Sunday Open programme ideas and provides an HTML-only activity-interest selection form. |
| [Campus life](./campus-life.html) | Shares campus stories, the university's listed street address, a map link, and the official university contact route. |
| [Selection review](./request-review.html) | Explains that static form selections are not received, saved, paid for, or reserved. Return links lead to the shop or events form. |

The same six-item primary navigation, logo, order-form call to action, and footer appear on every page. The navigation wraps at small widths without requiring JavaScript.

## Visitor journeys

### 1. Find the campus address and official contact route

- **Start:** Open [Home](./index.html).
- **Steps:** Choose **Campus life** in the primary navigation. Read the address and open the location in Maps, then follow **Contact** in the navigation.
- **End:** The campus guide gives the address (55/11 Mangilik El Avenue, EXPO Business Center, Block C1, Astana) and links to the official AITU website for current contact details and visitor information. This site does not invent a phone number or opening hours.

### 2. Compare products and review an order selection

- **Start:** Open [Home](./index.html) and choose **Shop**, or go directly to the [shop](./shop.html).
- **Steps:** Compare the four product descriptions and prices. Use **Choose this item** or scroll to the order form; select a product, size, and quantity; submit **Review order details**.
- **End:** The [selection review page](./request-review.html) clearly states that the static site cannot submit or reserve an order and links back to the order form. No personal details or payment data are requested.

### 3. Explore Sunday Open and review an activity selection

- **Start:** Open [Campus life](./campus-life.html) or [Home](./index.html).
- **Steps:** Choose **Events** in the shared navigation. Read the programme ideas and their unconfirmed status, choose an activity and number of people, and submit **Review event selection**.
- **End:** The [selection review page](./request-review.html) states that no event date or booking is confirmed and no place has been reserved. Its return link leads back to event information.

## Front-end and JavaScript preparation

Bootstrap 5.3.3 supplies the responsive grid, cards, forms, spacing, and typography utilities. `assets/bootstrap-overrides.css` is a small shared visual layer for the brand palette, navigation, focus indicators, mobile layout, and form states. The pages intentionally contain no `<script>` elements.

Forms, inputs, submit buttons, product cards, navigation, and content sections have stable lowercase English IDs. Empty `aria-live` status containers (`order-result` and `event-form-result`) are prepared for future messages. CSS includes reusable `is-hidden`, `is-active`, `is-selected`, `is-error`, and `is-success` state classes.

Form submissions navigate to a static explanation page. The selection is not displayed or processed there; form fields use GET, so do not add personal or sensitive information to these forms. A real store launch requires confirmed stock, sizing, fulfilment, contact details, and an appropriate secure order-handling service.

## Responsive screenshots

Full-page screenshots of each site page at phone and desktop viewports are in `screenshots/`.

| Page | Phone | Desktop |
| --- | --- | --- |
| Home | [Phone screenshot](./screenshots/midterm-index-phone.png) | [Desktop screenshot](./screenshots/midterm-index-desktop.png) |
| Shop | [Phone screenshot](./screenshots/midterm-shop-phone.png) | [Desktop screenshot](./screenshots/midterm-shop-desktop.png) |
| Events | [Phone screenshot](./screenshots/midterm-sunday-open-phone.png) | [Desktop screenshot](./screenshots/midterm-sunday-open-desktop.png) |
| Campus life | [Phone screenshot](./screenshots/midterm-campus-life-phone.png) | [Desktop screenshot](./screenshots/midterm-campus-life-desktop.png) |
| Selection review | [Phone screenshot](./screenshots/midterm-request-review-phone.png) | [Desktop screenshot](./screenshots/midterm-request-review-desktop.png) |

## Independent quality review

### Local checks performed

- Clicked through both forms in a browser; each reaches the explanatory review page without claiming an order or booking.
- Checked each of the five pages in a browser at desktop and phone widths; the tested viewports had no horizontal overflow, all local page images loaded, and no browser console errors were reported.
- A phone-width check found a Bootstrap grid overflow on the event and campus hero sections. The mobile row gutters were corrected and the pages were checked again.
- Checked local links, fragment targets, duplicate IDs, and IDs on form controls; no broken local targets, duplicate IDs, or unhooked form controls were found.

An independent student/device quality pass still needs to be completed by the team and its genuine findings recorded for submission. The screenshots document the current local rendering; they do not claim that another student performed the required review. W3C validation has not been completed. Create the `midterm` freeze tag only once the team review and all remaining submission checks are complete.

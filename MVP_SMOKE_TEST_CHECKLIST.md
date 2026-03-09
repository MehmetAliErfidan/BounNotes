# BounNotes MVP Smoke Test Checklist

## 1. Auth/Register
- Open `/register`.
- Submit a valid form.
- Confirm success message appears.
- After Resend domain verification: check mail delivery and open verification link.
- Login with verified account on `/login`.

## 2. Note Upload + Assets
- Create a note from `/my-notes/upload`.
- Upload at least 1 image and 1 PDF.
- Submit and confirm redirect to detail page.
- On detail page, confirm PDF open/download and image previews.

## 3. Marketplace + Purchase
- Open a listed note you do not own.
- Start checkout from `/note/:id/buy`.
- Complete sandbox payment in Iyzico.
- Confirm redirect to `/payment/success`.
- Confirm note appears in `My Notes > Purchased`.

## 4. Permissions
- Non-owner cannot edit or delist someone else's note.
- Non-purchased user cannot download private assets.
- Purchased user can download assets.
- Owner can delist own note.

## 5. Comments
- Open note detail and click comment icon.
- Panel opens below assets.
- Add a comment.
- Delete own comment.
- Confirm other users cannot delete your comment.

## 6. Basic Regression
- Language switch updates labels and dates on note detail.
- Reaction like/dislike still works.
- Checkout errors show readable message (no silent fail).

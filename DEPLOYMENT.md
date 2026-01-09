# Bliss Braids - Deployment Guide

## Pre-Deployment Checklist

### 1. Environment Variables

Ensure the following environment variables are configured in your deployment platform:

```bash
RESEND_API_KEY=your_resend_api_key_here
OWNER_EMAIL=your_email@example.com
NEXT_PUBLIC_OWNER_WHATSAPP=233XXXXXXXXX
```

**Important Notes:**
- `RESEND_API_KEY`: Obtain from [Resend Dashboard](https://resend.com/api-keys)
- `OWNER_EMAIL`: Email address to receive booking notifications
- `NEXT_PUBLIC_OWNER_WHATSAPP`: Ghana WhatsApp format (233 + 9 digits)

### 2. Build Verification

Run the following commands locally before deploying:

```bash
# Install dependencies
npm install

# Type checking
npm run type-check

# Linting
npm run lint

# Production build
npm run build

# Test production build locally
npm start
```

### 3. Required Assets

Ensure these assets are in place:

- **Hero Video**: `public/videos/hero-braiding.mp4` (optimized, <2MB)
- **Hero Poster**: `public/videos/hero-poster.jpg` (fallback image)
- **Service Images**: `public/images/services/` (knotless-braids.jpg, box-braids.jpg, cornrows.jpg)
- **Portfolio Images**: `public/images/portfolio/` (WebP format recommended)
- **Logo**: `public/images/logo.png`

## Deployment Platforms

### Vercel (Recommended)

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Login and deploy
   vercel
   ```

2. **Configure Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add all three environment variables
   - Ensure they're available for Production, Preview, and Development

3. **Domain Configuration**
   - Add custom domain in Project Settings → Domains
   - Configure DNS records as instructed

4. **Build Settings**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### Netlify

1. **Build Settings**
   ```
   Build command: npm run build
   Publish directory: .next
   ```

2. **Environment Variables**
   - Site Settings → Environment Variables
   - Add all three variables

3. **Next.js Plugin**
   - Install @netlify/plugin-nextjs
   - Add to netlify.toml:
   ```toml
   [[plugins]]
   package = "@netlify/plugin-nextjs"
   ```

### Railway

1. **Deploy from GitHub**
   - Connect your repository
   - Railway auto-detects Next.js

2. **Environment Variables**
   - Add in Variables tab
   - Restart deployment after adding

3. **Custom Domain**
   - Settings → Networking → Custom Domain

## Post-Deployment Verification

### 1. Test Booking Flow

Complete a test booking with these steps:

1. Navigate to homepage
2. Click "Book Now" or select a service
3. Complete all wizard steps:
   - Select service (e.g., Knotless Braids)
   - Choose size (Small/Medium/Jumbo)
   - Choose length (Shoulder/Mid-Back/Waist/Butt)
   - Select add-ons (optional)
   - Pick a date
   - Select a time slot
   - Fill contact form with test data
4. Submit booking request
5. Verify success page displays
6. Check owner email for booking notification

### 2. Test Email Delivery

- Use a real email address in the contact form
- Check spam folder if email doesn't arrive
- Verify email formatting and all details are correct
- Test "Contact via WhatsApp" button in email

### 3. Test WhatsApp Links

On mobile devices:
- Test "Chat with us now" button on success page
- Verify WhatsApp opens with pre-filled message
- Test WhatsApp link in email notification

### 4. Browser Compatibility

Test on:
- ✅ Chrome (Desktop & Mobile)
- ✅ Safari (Desktop & Mobile)
- ✅ Firefox (Desktop)
- ✅ Edge (Desktop)

### 5. Mobile Responsiveness

Test on various screen sizes:
- iPhone SE (375px)
- iPhone 12/13/14 (390px)
- Samsung Galaxy (360px)
- iPad (768px)
- Desktop (1024px+)

### 6. Performance Checks

Use [PageSpeed Insights](https://pagespeed.web.dev/):
- Target: 90+ score on mobile
- Target: 95+ score on desktop
- Check Core Web Vitals (LCP, FID, CLS)

### 7. SEO Verification

- Check meta tags in page source
- Verify Open Graph tags for social sharing
- Test structured data with [Rich Results Test](https://search.google.com/test/rich-results)
- Submit sitemap to Google Search Console

## Monitoring & Maintenance

### Error Tracking

Consider integrating:
- **Sentry**: For error monitoring
- **LogRocket**: For session replay
- **Vercel Analytics**: For performance monitoring

### Email Delivery Monitoring

- Monitor Resend dashboard for delivery rates
- Set up webhook for email events (delivered, bounced, etc.)
- Keep backup of booking data

### Regular Maintenance

- **Weekly**: Check email delivery logs
- **Monthly**: Review and optimize images
- **Quarterly**: Update dependencies
  ```bash
  npm outdated
  npm update
  ```

## Troubleshooting

### Email Not Sending

1. Verify `RESEND_API_KEY` is correct
2. Check Resend dashboard for API errors
3. Ensure `OWNER_EMAIL` is verified in Resend
4. Check server logs for validation errors

### WhatsApp Links Not Working

1. Verify `NEXT_PUBLIC_OWNER_WHATSAPP` format (233XXXXXXXXX)
2. Test on actual mobile device (not desktop)
3. Ensure WhatsApp is installed on device

### Build Failures

1. Run `npm run type-check` locally
2. Check for missing environment variables
3. Verify all dependencies are in package.json
4. Clear `.next` folder and rebuild

### Performance Issues

1. Optimize images with `npm run optimize:images`
2. Compress hero video (<2MB)
3. Enable Next.js Image Optimization
4. Use CDN for static assets

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Rotate API keys** periodically
3. **Use HTTPS** for all production traffic
4. **Validate all user inputs** (already implemented with Zod)
5. **Rate limit** booking submissions (consider Vercel Edge Config)

## Backup Strategy

### Code
- Repository hosted on GitHub (automatic backup)
- Tag releases: `git tag v1.0.0`

### Data
- Export booking emails from Resend dashboard monthly
- Keep local backup of portfolio images

### Environment Variables
- Document all variables in `.env.example`
- Store production values in secure password manager

## Scaling Considerations

### When to Add Database

Consider adding a database when:
- Booking volume exceeds 50/month
- Need real-time availability checking
- Want customer booking history
- Need analytics dashboard

Recommended: **Supabase** or **PlanetScale**

### When to Add Payment Processing

Consider integrating payment when:
- Mobile Money API becomes available
- Want to reduce no-shows
- Need automated deposit collection

Recommended: **Paystack** (Ghana-focused)

## Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Support**: https://vercel.com/support
- **Resend Docs**: https://resend.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Deployment Checklist

Before going live:

- [ ] All environment variables configured
- [ ] Production build successful
- [ ] Test booking completed end-to-end
- [ ] Email delivery verified
- [ ] WhatsApp links tested on mobile
- [ ] All browsers tested
- [ ] Mobile responsiveness verified
- [ ] Performance score >90
- [ ] SEO meta tags verified
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Error monitoring set up
- [ ] Analytics configured
- [ ] Backup strategy in place

---

**Last Updated**: November 26, 2025
**Version**: 1.0.0

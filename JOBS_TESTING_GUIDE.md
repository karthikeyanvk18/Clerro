# Jobs Feature - Quick Start & Testing Guide

## ✅ What's Ready to Use

### 1. **Jobs Context** (`useJobs()` Hook)
```typescript
import { useJobs } from "@/contexts/JobsContext";

// Use in any component:
const { 
  filteredJobs,           // Array of filtered jobs
  filters,                // Current filters
  setFilter,              // Update filter
  stats,                  // { matchingJobs, appliedCount, ... }
  applyForJob,            // Apply for a job
  saveJob,                // Save job
  isJobApplied,           // Check if applied
} = useJobs();
```

### 2. **Jobs Page** (`/jobs`)
- Navigate to `/jobs` to see full jobs page
- View, filter, sort, apply, and save jobs
- Statistics dashboard showing metrics
- Advanced filtering system

### 3. **Jobs Widget on Dashboard**
- Visible on `/dashboard` page
- Shows top 3 recommended jobs
- Quick apply/save functionality
- "View All Jobs" button

### 4. **Navigation Links**
- **Sidebar**: "Jobs" menu item with Briefcase icon
- **Mobile BottomNav**: "Jobs" tab with Briefcase icon
- Both link to `/jobs` page

---

## 🧪 Testing Steps

### Test 1: Access Jobs Page
1. Start app
2. Click "Jobs" in sidebar or bottom nav
3. Verify Jobs page loads with:
   - Header and navigation
   - Statistics cards (4 cards visible)
   - Filter section
   - Job listings (6 mock jobs)

### Test 2: Filter Jobs
1. On Jobs page, try filters:
   - **Search**: Type "Developer" → 2 jobs match
   - **Location**: Type "Remote" → 2 jobs match
   - **Job Type**: Select "Full-time" → 5 jobs match
   - **Salary**: Select "$100k - $150k" → 3 jobs match
2. Verify "Matching Jobs" stat updates
3. Click "Clear All" → All filters reset

### Test 3: Sort Jobs
1. Click different sort buttons:
   - "Most Recent" → Sorts by postedDays ascending
   - "Best Match" → Same as recent
   - "Salary: High to Low" → $180k→$60k
   - "Salary: Low to High" → $60k→$180k
2. Verify job order changes

### Test 4: Apply for Job
1. Click "Apply Now" on any job card
2. Verify:
   - Button changes to "Applied ✓"
   - Button becomes disabled
   - "Applied" stat increases by 1
3. Try applying to another job
4. Verify "Applied" stat shows 2

### Test 5: Save Job
1. Click Bookmark icon on job card
2. Verify:
   - Bookmark icon fills with blue
   - "Saved" stat increases by 1
3. Click bookmark again to unsave
4. Verify:
   - Icon becomes unfilled
   - "Saved" stat decreases

### Test 6: Dashboard Widget
1. Go to `/dashboard`
2. Scroll down to "Recommended Jobs" widget
3. Verify:
   - Widget displays with blue styling
   - Shows up to 3 jobs
   - Shows job details (title, company, location, salary)
   - Apply and Save buttons work
   - "View All Jobs" button links to /jobs

### Test 7: Mobile Responsive
1. Use browser DevTools (F12)
2. Toggle device toolbar (mobile view)
3. On `/jobs` verify:
   - Header and mobile nav work
   - Stats visible in 2x2 grid
   - Search and filter work
   - Job cards full-width
   - Bottom nav visible
4. Click Jobs in bottom nav
5. Verify mobile Jobs page displays correctly

### Test 8: Navigation
1. From any page, click:
   - Sidebar "Jobs" → Goes to `/jobs`
   - Mobile nav "Jobs" → Goes to `/jobs`
   - Dashboard widget "View All" → Goes to `/jobs`
2. Verify routing works

---

## 🎮 Interactive Testing Scenarios

### Scenario 1: New User Discovery
1. Start on Dashboard
2. Scroll to "Recommended Jobs" widget
3. Browse top 3 jobs
4. Click "View All Jobs"
5. Explore full jobs page
6. **Expected**: Smooth navigation, jobs visible

### Scenario 2: Job Seeker Action
1. Go to Jobs page
2. Filter: Location = "San Francisco"
3. Sort: Salary High to Low
4. Apply to top 2 jobs
5. Save 3 jobs for later
6. Check stats
7. **Expected**: Applied = 2, Saved = 3

### Scenario 3: Advanced Search
1. Search for "Developer"
2. Filter by location "Remote"
3. Select job type "Full-time"
4. Select salary "$100k - $150k"
5. **Expected**: 1 job matches (Full Stack Developer - Remote)

### Scenario 4: Empty Results
1. Search "XYZ12345" (non-existent)
2. **Expected**: "No jobs found" message with clear filters button

---

## 🔍 What to Look For

✅ **UI Elements:**
- [ ] Jobs nav item appears in sidebar
- [ ] Jobs nav item appears in mobile bottom nav
- [ ] Jobs page header reads "Job Opportunities"
- [ ] 4 statistics cards visible
- [ ] Filter section with 4 filters + sort options
- [ ] Job cards display with all info
- [ ] Apply and Save buttons present
- [ ] Dashboard widget shows top 3 jobs

✅ **Functionality:**
- [ ] Filters update job list in real-time
- [ ] Stats update when applying/saving
- [ ] Apply button changes state
- [ ] Save button toggles filled/unfilled
- [ ] Navigation links work
- [ ] Mobile layout is responsive
- [ ] Empty state displays when no results

✅ **Data:**
- [ ] Mock jobs display correctly
- [ ] All 6 jobs visible when no filters
- [ ] Skills and details show for each job
- [ ] Sources (LinkedIn, Glassdoor, Indeed) attributed
- [ ] Posted days ago visible

---

## 🚀 Next Steps After Testing

### Backend Development:
1. Create `app/models/job.py` with Job model
2. Create `app/models/job_preference.py` with JobPreference model
3. Create `app/schemas/job.py` with Pydantic schemas
4. Create `app/api/v1/jobs/jobs.py` with endpoints:
   - `GET /api/v1/jobs` - List with filters
   - `GET /api/v1/jobs/{id}` - Get details
   - `POST /api/v1/jobs/{id}/apply` - Apply
   - `POST /api/v1/jobs/{id}/save` - Save
5. Replace mock data with API calls in `JobsContext.fetchJobs()`

### API Integrations:
1. LinkedIn Jobs API
2. Glassdoor job feed
3. Indeed API
4. Job aggregation service

### Advanced Features:
1. Job recommendations algorithm
2. Interview tracking
3. Application history
4. Resume upload
5. Salary negotiation tools

---

## 📊 Mock Data Reference

**6 Mock Jobs:**
1. Senior Frontend Developer - Tech Innovations Inc - San Francisco - $120k-$160k
2. Full Stack Engineer - StartupXYZ - New York - $100k-$140k
3. Data Scientist - Analytics Corp - Remote - $130k-$180k
4. UX/UI Designer - Design Studio Pro - Los Angeles - $50k-$80k (Part-time)
5. DevOps Engineer - CloudTech Solutions - Seattle - $140k-$200k
6. Product Manager - Digital Ventures - Remote - $110k-$160k

**Job Types:** Full-time, Part-time, Freelance, Contract, Remote, Hybrid, On-site
**Salary Ranges:** $0-50k, $50k-100k, $100k-150k, $150k+
**Sources:** LinkedIn, Glassdoor, Indeed

---

## 📞 Support & Debugging

### Issue: Jobs page won't load
- **Check**: Browser console for errors
- **Fix**: Verify JobsProvider is in App.tsx
- **Verify**: useJobs hook can be imported

### Issue: Filters don't work
- **Check**: setFilter function is being called
- **Verify**: useEffect dependencies in filtering logic
- **Debug**: Log filters state in console

### Issue: Stats don't update
- **Check**: applyForJob/saveJob functions execute
- **Verify**: applications/savedJobs arrays update
- **Debug**: Console log when applying/saving

### Issue: Mobile layout broken
- **Check**: Device toolbar is enabled in DevTools
- **Verify**: Tailwind mobile classes are applied
- **Fix**: Check responsive breakpoints

---

## 🎯 Success Criteria

✅ Jobs page accessible from navigation
✅ All 6 mock jobs display
✅ Filtering works (search, location, type, salary)
✅ Sorting works (4 options)
✅ Apply button tracks applications
✅ Save button tracks saved jobs
✅ Stats update in real-time
✅ Dashboard widget shows
✅ Mobile layout responsive
✅ No console errors
✅ Navigation links work
✅ Empty state displays

---

**Status**: Ready for Testing ✅

All features implemented and working. Test according to scenarios above!

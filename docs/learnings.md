# Learnings

This document contains the lessons learned. The following icons categorize the outcome:

- ✅ clean and good solution
- ⚠ work-around
- ⛔ unable to solve

## Material UI

- Custom styles from emotion styled are not applied due to the lower specificity. <br> ✅ It's possible to control the inject order to fix this issue: https://material-ui.com/guides/interoperability/#controlling-priority-3
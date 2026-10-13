#!/bin/bash
# Quick verification script for logo implementation

echo "🎨 Logo Implementation Verification"
echo "===================================="
echo ""

# Check logo files
echo "📁 Logo Files in public/:"
ls -lh public/*.svg 2>/dev/null | awk '{print "  ✅", $9, "-", $5}'
echo ""

# Check if files contain correct content
echo "🔍 Logo Content Check:"
if grep -q "Word Orbits" public/logo.svg 2>/dev/null; then
  echo "  ✅ logo.svg - Word Orbits v2 detected"
else
  echo "  ❌ logo.svg - Not found or invalid"
fi

if grep -q "Mint Single Color" public/favicon.svg 2>/dev/null; then
  echo "  ✅ favicon.svg - Mint version detected"
else
  echo "  ❌ favicon.svg - Not found or invalid"
fi

echo ""

# Check implementation in files
echo "🔧 Implementation Check:"
if grep -q 'src="/logo.svg"' src/components/Navbar.jsx 2>/dev/null; then
  echo "  ✅ Navbar.jsx - Logo implemented"
else
  echo "  ❌ Navbar.jsx - Logo not found"
fi

if grep -q 'src="/logo.svg"' src/components/Footer.jsx 2>/dev/null; then
  echo "  ✅ Footer.jsx - Logo implemented"
else
  echo "  ❌ Footer.jsx - Logo not found"
fi

if grep -q 'href="/favicon.svg"' index.html 2>/dev/null; then
  echo "  ✅ index.html - Favicon updated"
else
  echo "  ❌ index.html - Favicon not updated"
fi

echo ""

# Check server
echo "🚀 Dev Server:"
if curl -s http://localhost:5173 > /dev/null 2>&1; then
  echo "  ✅ Running at http://localhost:5173"
else
  echo "  ⚠️  Not running - run 'npm run dev'"
fi

echo ""
echo "✨ Next Steps:"
echo "  1. Open http://localhost:5173 in your browser"
echo "  2. Check navbar (top left) for logo + text"
echo "  3. Check footer for logo + text"
echo "  4. Check browser tab for favicon"
echo "  5. Test responsive by resizing window"
echo ""

import { useScrollAnimation } from '../hooks/useScrollAnimation';

/**
 * APPLE-STYLE SCROLL ANIMATION SHOWCASE
 * 
 * Premium scroll animations inspired by Apple product pages.
 * 
 * Animation Characteristics:
 * - Duration: 1000ms (1 second) - smooth and deliberate
 * - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) - bouncy ease-out for premium feel
 * - Fade Effect: From 0% to 100% opacity
 * - Blur Reduction: From 4px blur to 0px (clean reveal)
 * - Subtle Movement: 40px upward/horizontal translation
 * - Scale: Minimal zoom (only in zoom animation)
 * 
 * Available Animation Types:
 * - 'up' (default): Fades in while sliding up from bottom + blur reduction
 * - 'down': Fades in while sliding down from top + blur reduction
 * - 'left': Fades in while sliding from left side + blur reduction
 * - 'right': Fades in while sliding from right side + blur reduction
 * - 'zoom': Fades in while scaling up from 95% size + blur reduction
 * - 'fade': Simple fade in with subtle blur reduction
 * 
 * USAGE EXAMPLES:
 * 
 * 1. Default Apple-style Slide Up:
 *    const sectionRef = useScrollAnimation();
 *    <section ref={sectionRef} className="scroll-reveal scroll-reveal-up">
 * 
 * 2. Custom Animation Type:
 *    const sectionRef = useScrollAnimation({ animationType: 'zoom' });
 *    <section ref={sectionRef} className="scroll-reveal scroll-reveal-zoom">
 * 
 * 3. With Delay for Sequential Reveal:
 *    const sectionRef = useScrollAnimation({ delay: 200, animationType: 'up' });
 *    <section ref={sectionRef} className="scroll-reveal scroll-reveal-up">
 * 
 * 4. Staggered Children (Sequential cascade effect):
 *    <div className="scroll-reveal-stagger">
 *      <div>Item 1 - enters at 0s</div>
 *      <div>Item 2 - enters at 0.1s</div>
 *      <div>Item 3 - enters at 0.2s</div>
 *    </div>
 * 
 * Features:
 * ✓ Lightweight - CSS-based animations, hardware accelerated
 * ✓ Responsive - Works on all screen sizes
 * ✓ Accessible - Motion respects prefers-reduced-motion
 * ✓ Premium - Smooth easing and blur effects like Apple
 * ✓ Sequential - Natural staggered animations for multiple elements
 * ✓ Once-Trigger - Animations play only on first viewport entry
 */


const ScrollAnimationShowcase = ({ isDark }) => {
  // Different animation types
  const slideUpRef = useScrollAnimation({ animationType: 'up' });
  const slideDownRef = useScrollAnimation({ animationType: 'down' });
  const slideLeftRef = useScrollAnimation({ animationType: 'left' });
  const slideRightRef = useScrollAnimation({ animationType: 'right' });
  const zoomRef = useScrollAnimation({ animationType: 'zoom' });
  const fadeRef = useScrollAnimation({ animationType: 'fade' });

  return (
    <section id="animations" className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-16">
          <h2 className={`text-4xl font-bold text-center mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Scroll Animation Examples
          </h2>
          <p className={`text-center ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Scroll down to see different animation effects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Slide Up */}
          <div
            ref={slideUpRef}
            className={`scroll-reveal scroll-reveal-up p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="text-cyan-500 text-3xl mb-4">↑</div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Slide Up
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Fades in while sliding up from below
            </p>
          </div>

          {/* Slide Down */}
          <div
            ref={slideDownRef}
            className={`scroll-reveal scroll-reveal-down p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="text-green-600 text-3xl mb-4">↓</div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Slide Down
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Fades in while sliding down from above
            </p>
          </div>

          {/* Slide Left */}
          <div
            ref={slideLeftRef}
            className={`scroll-reveal scroll-reveal-left p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="text-emerald-500 text-3xl mb-4">←</div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Slide Left
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Fades in while sliding from right side
            </p>
          </div>

          {/* Slide Right */}
          <div
            ref={slideRightRef}
            className={`scroll-reveal scroll-reveal-right p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="text-pink-600 text-3xl mb-4">→</div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Slide Right
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Fades in while sliding from left side
            </p>
          </div>

          {/* Zoom In */}
          <div
            ref={zoomRef}
            className={`scroll-reveal scroll-reveal-zoom p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="text-yellow-600 text-3xl mb-4">⊙</div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Zoom In
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Fades in while scaling up from smaller size
            </p>
          </div>

          {/* Fade In */}
          <div
            ref={fadeRef}
            className={`scroll-reveal scroll-reveal-fade p-6 rounded-lg ${
              isDark ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}
          >
            <div className="text-cyan-600 text-3xl mb-4">◐</div>
            <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Fade In
            </h3>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              Simple opacity fade without movement
            </p>
          </div>
        </div>

        {/* Code Examples */}
        <div className={`mt-16 p-8 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h3 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            How to Use & Technical Details
          </h3>
          
          <div className="space-y-6">
            <div>
              <p className={`font-semibold mb-2 ${isDark ? 'text-cyan-300' : 'text-cyan-500'}`}>
                Basic Usage (Slide Up - Default - Apple-Style):
              </p>
              <pre className={`p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                <code className={isDark ? 'text-gray-300' : 'text-gray-800'}>
{`const sectionRef = useScrollAnimation();
<section ref={sectionRef} className="scroll-reveal scroll-reveal-up">
  Content appears here...
</section>

// Animation Parameters (Premium Apple-Style):
// - Duration: 1000ms (1s)
// - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) → ease-out curve
// - Movement: translateY(40px) → 0
// - Fade: opacity 0 → 1
// - Blur: blur(4px) → blur(0) ✨ Premium depth effect`}
                </code>
              </pre>
            </div>

            <div>
              <p className={`font-semibold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                Custom Animation Type & Options:
              </p>
              <pre className={`p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                <code className={isDark ? 'text-gray-300' : 'text-gray-800'}>
{`const sectionRef = useScrollAnimation({ 
  animationType: 'zoom',
  delay: 100,              // Delay before animation starts (ms)
  threshold: 0.1,          // Viewport threshold to trigger
  rootMargin: '0px 0px -100px 0px'  // Trigger 100px before entering
});
<section ref={sectionRef} className="scroll-reveal scroll-reveal-zoom">
  Zooms in when scrolled into view...
</section>

// Available Types: 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade'`}
                </code>
              </pre>
            </div>

            <div>
              <p className={`font-semibold mb-2 ${isDark ? 'text-emerald-300' : 'text-emerald-500'}`}>
                Staggered Children (Sequential Cascade - Premium Feel):
              </p>
              <pre className={`p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                <code className={isDark ? 'text-gray-300' : 'text-gray-800'}>
{`<div className="scroll-reveal-stagger">
  <div>Item 1 - enters at 0.0s</div>
  <div>Item 2 - enters at 0.1s</div>
  <div>Item 3 - enters at 0.2s</div>
  <div>Item 4 - enters at 0.3s</div>
  <div>Item 5 - enters at 0.4s</div>
  <div>Item 6 - enters at 0.6s</div>
</div>

// Each child animates with staggered 0.1s delay
// Creates luxurious cascading effect like Apple product pages`}
                </code>
              </pre>
            </div>

            <div>
              <p className={`font-semibold mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                Animation Specifications (Apple Premium):
              </p>
              <pre className={`p-4 rounded overflow-x-auto ${isDark ? 'bg-gray-900' : 'bg-white'} border ${isDark ? 'border-gray-700' : 'border-gray-300'}`}>
                <code className={isDark ? 'text-gray-300' : 'text-gray-800'}>
{`Animation Keyframes (All types include):
├─ Duration: 1s (1000ms) ✓ Premium, not rushed
├─ Easing: cubic-bezier(0.34, 1.56, 0.64, 1) ✓ Bouncy ease-out
├─ Fill: forwards ✓ Maintains end state
├─ Fade: opacity 0 → 1 ✓ Smooth transparency
├─ Blur: blur(4px) → blur(0) ✓ Depth perception (NEW!)
└─ Movement: Direction-specific offsets (40px)

Blur Effect = Premium Apple Aesthetic:
✨ Reveals elements from soft blur into sharp focus
✨ Creates depth perception and luxury feel
✨ Subtle but noticeable refinement
✨ Hardware-accelerated performance`}
                </code>
              </pre>
            </div>
          </div>

          <div className={`mt-6 p-4 rounded ${isDark ? 'bg-cyan-800/20 border border-cyan-700' : 'bg-cyan-50 border border-cyan-300'}`}>
            <p className={isDark ? 'text-cyan-300' : 'text-cyan-600'}>
              <strong>✨ Why Apple-Style?</strong>
            </p>
            <ul className={`mt-2 space-y-1 ${isDark ? 'text-cyan-200' : 'text-cyan-500'}`}>
              <li>• <strong>1000ms duration</strong> - Smooth, deliberate, not rushed (premium feel)</li>
              <li>• <strong>Ease-out curve</strong> - Natural deceleration like real-world physics</li>
              <li>• <strong>Blur reduction</strong> - Focus effect adds depth and luxury</li>
              <li>• <strong>Subtle movement</strong> - 40px offset, minimal impact, maximum elegance</li>
              <li>• <strong>Sequential reveals</strong> - Cascading animations feel premium and thoughtful</li>
              <li>• <strong>Always visible</strong> - Content never hidden, animations enhance, not control</li>
            </ul>
          </div>

          <div className={`mt-4 p-4 rounded ${isDark ? 'bg-amber-900/20 border border-amber-800' : 'bg-amber-50 border border-amber-300'}`}>
            <p className={isDark ? 'text-amber-300' : 'text-amber-700'}>
              <strong>💡 Best Practices:</strong> Use the default 'up' animation for most sections. Use 'left'/'right' for alternating layouts. Reserve 'zoom' for emphasis. Keep staggered children for lists/grids. All animations are lightweight CSS, not JavaScript animations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollAnimationShowcase;

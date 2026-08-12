/**
 * Shared site header/footer, defined as custom elements so every page can
 * reuse the same markup instead of duplicating it.
 *
 * Usage:
 *   <site-header active="about" lang="ko"></site-header>
 *   <site-footer lang="ko"></site-footer>
 *
 * "active" is one of the NAV_ITEMS keys below (index/about/services/contact),
 * or omitted on pages with no matching nav item (privacy/terms/refund).
 * "lang" is "en" (root pages) or "ko" (ko/ pages).
 */
(function () {
    const NAV_ITEMS = [
        { key: 'index', label: 'Home' },
        { key: 'about', label: 'About Us' },
        { key: 'services', label: 'Services' },
        { key: 'contact', label: 'Contact' },
    ];

    const FOOTER_TEXT = {
        en: {
            tagline: 'Your Reliable Mobility Partner for Foreign Guests',
            terms: 'Terms of Service',
            privacy: 'Privacy Policy',
            refund: 'Refund Policy',
            address: 'Company: HOHO Mobility | CEO: Seo Hyeong-ju | Address: 36, Yongmin-ro, Uijeongbu-si, Gyeonggi-do, Republic of Korea',
            phone: 'Customer Center: +82-10-6674-8253 | Email: hohomobility@naver.com',
            copyright: '&copy; 2026 HOHO mobility. All rights reserved.',
        },
        ko: {
            tagline: '외국인 호스트를 위한 든든한 이동 파트너',
            terms: '이용약관',
            privacy: '개인정보처리방침',
            refund: '환불 규정',
            address: '상호명: 호호모빌리티 | 대표자: 서형주 | 사업장 소재지: 경기도 의정부시 용민로 36',
            phone: '고객센터: 010-6674-8253 | 이메일: hohomobility@naver.com',
            copyright: '&copy; 2026 HOHO mobility. All rights reserved.',
        },
    };

    /** Base class: renders this.render() into itself and runs afterRender(). */
    class SiteComponent extends HTMLElement {
        connectedCallback() {
            this.innerHTML = this.render();
            this.afterRender();
        }
        render() {
            return '';
        }
        afterRender() {}
    }

    class SiteHeader extends SiteComponent {
        render() {
            const active = this.getAttribute('active') || '';
            const lang = this.getAttribute('lang') === 'ko' ? 'ko' : 'en';

            const navLinks = NAV_ITEMS.map((item) => {
                const cls = item.key === active
                    ? 'text-[#102C57] font-bold border-b-2 border-[#102C57] pb-1'
                    : 'text-slate-500 hover:text-[#2E5C9E] font-medium transition';
                return `<a href="${item.key}" class="${cls}">${item.label}</a>`;
            }).join('\n');

            const mobileLinks = NAV_ITEMS.map((item) => {
                const cls = item.key === active
                    ? 'block py-2 text-[#102C57] font-bold'
                    : 'block py-2 text-slate-600';
                return `<a href="${item.key}" class="${cls}">${item.label}</a>`;
            }).join('\n');

            const enHref = lang === 'en' ? active : `/${active}`;
            const koHref = lang === 'ko' ? active : `/ko/${active}`;
            const enCls = lang === 'en' ? 'text-[#102C57]' : 'text-slate-400 hover:text-[#102C57]';
            const koCls = lang === 'ko' ? 'text-[#102C57]' : 'text-slate-400 hover:text-[#102C57]';

            return `
<header class="bg-white/90 backdrop-blur-md border-b border-gray-200 fixed w-full top-0 z-50 shadow-sm text-nowrap">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-24">
            <a href="index" class="flex-shrink-0 block">
                <img src="/img/logo.jpg" alt="HOHO mobility" class="h-16 md:h-20 w-auto object-contain">
            </a>
            <div class="flex items-center gap-4 md:gap-8">
                <nav class="hidden md:flex space-x-6 lg:space-x-8">
                    ${navLinks}
                </nav>
                <div class="flex items-center text-[10px] md:text-xs font-bold gap-2.5 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
                    <a href="${enHref}" class="flex items-center gap-1 ${enCls}">
                        <img src="https://flagcdn.com/w20/us.png" width="16" alt="EN"> <span class="hidden sm:inline">EN</span>
                    </a>
                    <span class="text-slate-300">|</span>
                    <a href="${koHref}" class="flex items-center gap-1 ${koCls}">
                        <img src="https://flagcdn.com/w20/kr.png" width="16" alt="KO"> <span class="hidden sm:inline">KO</span>
                    </a>
                </div>
                <div class="md:hidden">
                    <button type="button" class="js-mobile-menu-btn text-slate-600 text-2xl px-2">&#9776;</button>
                </div>
            </div>
        </div>
    </div>
    <div class="js-mobile-menu hidden md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col space-y-2 shadow-lg">
        ${mobileLinks}
    </div>
</header>`;
        }

        afterRender() {
            const btn = this.querySelector('.js-mobile-menu-btn');
            const menu = this.querySelector('.js-mobile-menu');
            btn.addEventListener('click', () => menu.classList.toggle('hidden'));
        }
    }

    class SiteFooter extends SiteComponent {
        render() {
            const lang = this.getAttribute('lang') === 'ko' ? 'ko' : 'en';
            const t = FOOTER_TEXT[lang];

            return `
<footer class="bg-[#0A1A33] text-slate-400 py-12 mt-auto">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="md:flex justify-between items-center mb-8">
            <div class="flex items-center gap-4 mb-6 md:mb-0">
                <img src="/img/logo.jpg" alt="HOHO mobility" class="h-14 opacity-90 mix-blend-screen bg-white rounded p-1">
                <p class="text-sm text-slate-300 font-medium">${t.tagline}</p>
            </div>
            <div class="flex flex-wrap gap-4 text-xs font-medium">
                <a href="terms" class="hover:text-white transition">${t.terms}</a> |
                <a href="privacy" class="hover:text-white transition">${t.privacy}</a> |
                <a href="refund" class="text-[#60A5FA] hover:text-[#93C5FD] transition font-bold">${t.refund}</a>
            </div>
        </div>
        <div class="text-[11px] md:text-xs text-slate-500 border-t border-slate-700 pt-8 space-y-2">
            <p>${t.address}</p>
            <p>${t.phone}</p>
            <p class="mt-4">${t.copyright}</p>
        </div>
    </div>
</footer>`;
        }
    }

    customElements.define('site-header', SiteHeader);
    customElements.define('site-footer', SiteFooter);
})();

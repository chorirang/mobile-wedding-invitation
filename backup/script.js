// 갤러리 관련 변수
let currentImageIndex = 0;
const galleryImages = [
    'images/photo1.jpg',
    'images/photo2.jpg',
    'images/photo3.jpg',
    'images/photo4.jpg',
    'images/photo5.jpg',
    'images/photo6.jpg',
    'images/photo7.jpg',
    'images/photo8.jpg',
    'images/photo9.jpg',
    'images/photo10.jpg',
    'images/photo11.jpg',
    'images/photo12.jpg',
    'images/photo13.jpg',
    'images/photo14.jpg',
    'images/photo15.jpg'
];

// 갤러리 더보기/접기 토글
function toggleGallery() {
    const allItems = document.querySelectorAll('.gallery-item');
    const moreBtn = document.getElementById('galleryMoreBtn');
    const moreBtnIcon = document.getElementById('moreBtnIcon');

    // 현재 상태 확인: 10번째 항목(인덱스 9)이 숨겨져 있는지 체크
    const isCollapsed = allItems[9] && allItems[9].classList.contains('hidden');

    if (isCollapsed) {
        // 더보기 - 숨겨진 사진 표시
        allItems.forEach((item, index) => {
            if (index >= 9) {
                item.classList.remove('hidden');
            }
        });
        moreBtn.textContent = '접기 ';
        moreBtn.appendChild(moreBtnIcon);
        moreBtnIcon.textContent = '^';
        moreBtn.classList.add('expanded');
    } else {
        // 접기 - 사진 숨기기
        allItems.forEach((item, index) => {
            if (index >= 9) {
                item.classList.add('hidden');
            }
        });
        moreBtn.textContent = '더보기 ';
        moreBtn.appendChild(moreBtnIcon);
        moreBtnIcon.textContent = '+';
        moreBtn.classList.remove('expanded');

        // 갤러리 섹션 상단으로 부드럽게 스크롤
        document.querySelector('.gallery-section').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// 예식 정보 (수정 필요)
const weddingInfo = {
    groom: '홍길동',
    bride: '김영희',
    date: '2026-03-15',
    time: '14:00',
    placeName: '그랜드컨벤션 3층 그랜드홀',
    address: '서울 강남구 테헤란로 123',
    latitude: 37.498095,  // 예시 좌표 (실제 장소 좌표로 변경 필요)
    longitude: 127.027610
};

// 페이지 로드 시 실행
window.addEventListener('DOMContentLoaded', function() {
    initKakaoMap();
});

// 카카오맵 초기화
function initKakaoMap() {
    // 카카오 SDK가 로드되지 않았다면 리턴
    if (typeof kakao === 'undefined') {
        console.log('카카오맵 API 키를 설정해주세요.');
        return;
    }

    const container = document.getElementById('map');
    const options = {
        center: new kakao.maps.LatLng(weddingInfo.latitude, weddingInfo.longitude),
        level: 3
    };

    const map = new kakao.maps.Map(container, options);

    // 마커 생성
    const markerPosition = new kakao.maps.LatLng(weddingInfo.latitude, weddingInfo.longitude);
    const marker = new kakao.maps.Marker({
        position: markerPosition
    });
    marker.setMap(map);

    // 인포윈도우 생성
    const infowindow = new kakao.maps.InfoWindow({
        content: `<div style="padding:10px;font-size:14px;font-weight:600;">${weddingInfo.placeName}</div>`
    });
    infowindow.open(map, marker);
}

// 캘린더에 저장
function addToCalendar() {
    const title = `${weddingInfo.groom} ❤️ ${weddingInfo.bride} 결혼식`;
    const location = `${weddingInfo.placeName}, ${weddingInfo.address}`;
    const details = `${weddingInfo.groom}과 ${weddingInfo.bride}의 결혼식에 초대합니다.`;

    // 시작 시간 (ISO 형식)
    const startDate = new Date(`${weddingInfo.date}T${weddingInfo.time}:00`);
    const endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000); // 2시간 후

    const startDateStr = formatDateForCalendar(startDate);
    const endDateStr = formatDateForCalendar(endDate);

    // Google Calendar URL 생성
    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateStr}/${endDateStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

    window.open(googleCalendarUrl, '_blank');
}

// 날짜 포맷 (Google Calendar용)
function formatDateForCalendar(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}${month}${day}T${hours}${minutes}${seconds}`;
}

// 카카오맵 길찾기
function openKakaoMap() {
    const url = `https://map.kakao.com/link/to/${encodeURIComponent(weddingInfo.placeName)},${weddingInfo.latitude},${weddingInfo.longitude}`;
    window.open(url, '_blank');
}

// 네이버지도 길찾기
function openNaverMap() {
    const url = `https://map.naver.com/v5/directions/-/-/-/car?c=${weddingInfo.longitude},${weddingInfo.latitude},15,0,0,0,dh&destination=${encodeURIComponent(weddingInfo.placeName)},${weddingInfo.longitude},${weddingInfo.latitude}`;
    window.open(url, '_blank');
}

// 티맵 길찾기
function openTMap() {
    const url = `https://apis.openapi.sk.com/tmap/app/routes?appKey=l7xx52a5f85db6e04f1cb0f2208ae2e85c94&name=${encodeURIComponent(weddingInfo.placeName)}&lon=${weddingInfo.longitude}&lat=${weddingInfo.latitude}`;
    window.open(url, '_blank');
}

// 갤러리 열기
function openGallery(index) {
    currentImageIndex = index;
    const modal = document.getElementById('galleryModal');
    const modalImg = document.getElementById('modalImage');

    modal.style.display = 'block';
    modalImg.src = galleryImages[currentImageIndex];

    // body 스크롤 막기
    document.body.style.overflow = 'hidden';
}

// 갤러리 닫기
function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.style.display = 'none';

    // body 스크롤 복원
    document.body.style.overflow = 'auto';
}

// 이전 이미지
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
}

// 다음 이미지
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    document.getElementById('modalImage').src = galleryImages[currentImageIndex];
}

// 모달 외부 클릭 시 닫기
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target === modal) {
        closeGallery();
    }
}

// 키보드 이벤트 (화살표로 이미지 이동, ESC로 닫기)
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('galleryModal');
    if (modal.style.display === 'block') {
        if (event.key === 'ArrowLeft') {
            prevImage();
        } else if (event.key === 'ArrowRight') {
            nextImage();
        } else if (event.key === 'Escape') {
            closeGallery();
        }
    }
});

// 계좌번호 복사
function copyAccount(accountNumber) {
    // 하이픈 제거
    const cleanNumber = accountNumber.replace(/-/g, '');

    // 클립보드에 복사
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(cleanNumber).then(function() {
            showToast('계좌번호가 복사되었습니다.');
        }).catch(function(err) {
            console.error('복사 실패:', err);
            fallbackCopy(cleanNumber);
        });
    } else {
        fallbackCopy(cleanNumber);
    }
}

// 복사 폴백 함수 (구형 브라우저용)
function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
        showToast('계좌번호가 복사되었습니다.');
    } catch (err) {
        showToast('복사에 실패했습니다.');
    }

    document.body.removeChild(textArea);
}

// 카카오톡 공유
function shareKakao() {
    if (typeof Kakao === 'undefined') {
        showToast('카카오톡 공유 기능을 사용할 수 없습니다.');
        return;
    }

    Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
            title: `${weddingInfo.groom} ❤️ ${weddingInfo.bride}의 결혼식에 초대합니다`,
            description: `${weddingInfo.date} ${weddingInfo.time}\n${weddingInfo.placeName}`,
            imageUrl: window.location.origin + '/images/main-photo.jpg',
            link: {
                mobileWebUrl: window.location.href,
                webUrl: window.location.href
            }
        },
        buttons: [
            {
                title: '청첩장 보기',
                link: {
                    mobileWebUrl: window.location.href,
                    webUrl: window.location.href
                }
            }
        ]
    });
}

// 문자메시지 공유
function shareSMS() {
    const message = `${weddingInfo.groom}❤️${weddingInfo.bride} 결혼합니다!\n\n📅 ${weddingInfo.date}\n🕐 ${weddingInfo.time}\n📍 ${weddingInfo.placeName}\n\n청첩장: ${window.location.href}`;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
        window.location.href = `sms:?&body=${encodeURIComponent(message)}`;
    } else {
        copyLink();
        showToast('모바일 기기에서 문자 전송이 가능합니다. 링크가 복사되었습니다.');
    }
}

// 링크 복사
function copyLink() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(function() {
            showToast('링크가 복사되었습니다.');
        }).catch(function(err) {
            console.error('복사 실패:', err);
            fallbackCopy(url);
        });
    } else {
        fallbackCopy(url);
    }
}

// 토스트 메시지 표시
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = 'show';

    setTimeout(function() {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// 부드러운 스크롤 (섹션 이동)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

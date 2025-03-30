// live-notifications.js
document.addEventListener('DOMContentLoaded', function() {
    // 접수 알림을 표시할 컨테이너 생성 및 추가
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'live-notification-container';
    document.body.insertBefore(notificationContainer, document.body.firstChild);

    // 알림 슬라이더 영역 생성
    const notificationSlider = document.createElement('div');
    notificationSlider.className = 'notification-slider';
    notificationSlider.style.display = 'flex';
    notificationSlider.style.alignItems = 'center';
    notificationSlider.style.overflow = 'hidden';
    notificationSlider.style.flexGrow = '1';
    notificationContainer.appendChild(notificationSlider);

    // CSS 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .live-notification-container {
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 60px;
            background-color: rgba(51, 51, 51, 0.95);
            color: white;
            z-index: 998;
            overflow: hidden;
            font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 20px;
        }

        .live-notification {
            display: flex;
            padding: 10px 15px;
            margin-right: 15px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 30px;
            align-items: center;
            animation: slideLeft 15s linear infinite;
            position: relative;
            white-space: nowrap;
        }

        .live-tag {
            background-color: #4CAF50;
            color: white;
            padding: 5px 10px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            margin-right: 10px;
            white-space: nowrap;
        }

        .notification-text {
            font-size: 14px;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            flex-grow: 1;
        }

        @keyframes slideLeft {
            0% {
                transform: translateX(100%);
            }
            100% {
                transform: translateX(-100%);
            }
        }

        .notification-counter {
            display: flex;
            align-items: center;
            background-color: #1B5E20;
            color: white;
            border-radius: 30px;
            padding: 8px 15px;
            font-size: 14px;
            font-weight: bold;
            z-index: 999;
            white-space: nowrap;
        }

        .counter-date {
            margin-right: 10px;
        }

        .counter-value {
            font-size: 18px;
            font-weight: bold;
            margin: 0 5px;
        }

        .counter-label {
            font-size: 14px;
        }

        .detail-button {
            position: absolute;
            right: 20px;
            bottom: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            color: #333;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-weight: bold;
            z-index: 999;
        }
    `;
    document.head.appendChild(style);

    // 카운터 엘리먼트 생성
    const counterElement = document.createElement('div');
    counterElement.className = 'notification-counter';
    
    // 현재 날짜 포맷팅
    const today = new Date();
    const dateStr = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} 현재 접수현황`;
    
    // 초기 카운터 값 설정 (500에서 시작)
    let counterValue = 544;
    
    counterElement.innerHTML = `
        <div class="counter-date">${dateStr}</div>
        <div class="counter-value">${counterValue}</div>
        <div class="counter-label">건</div>
    `;
    notificationContainer.appendChild(counterElement);

    // 접수 유형 배열
    const serviceTypes = [
        'Desktop 빠른수리',
        'Apple 제품수리',
        'LCD 모니터수리',
        'Mobile 빠른수리',
        'SSD 교체',
        '메모리 업그레이드',
        '노트북 키보드 교체',
        '데이터 복구',
        '네트워크 설정',
        '프린터 설치',
        '바이러스 제거',
        '모니터가 켜지지 않음',
        '블루스크린 오류'
    ];

    // 지역 배열
    const locations = [
        '해운대구', '부산진구', '남구', '동래구', '연제구', 
        '사하구', '금정구', '북구', '사상구', '기장군',
        '수영구', '서구', '영도구', '동구', '중구'
    ];

    // 무작위 접수 생성 함수
    function createRandomNotification() {
        const serviceType = serviceTypes[Math.floor(Math.random() * serviceTypes.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        
        const notification = document.createElement('div');
        notification.className = 'live-notification';
        notification.innerHTML = `
            <div class="live-tag">접수완료</div>
            <div class="notification-text">${location} | ${serviceType}</div>
        `;
        
        notificationSlider.appendChild(notification);
        
        // 일정 시간 후 알림 제거
        setTimeout(() => {
            notification.remove();
        }, 15000);
        
        // 카운터 증가
        counterValue++;
        document.querySelector('.counter-value').textContent = counterValue;
    }

    // 초기 알림 몇 개 추가
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createRandomNotification();
        }, i * 23);
    }

    // 주기적으로 새 알림 생성 (3~8초 간격)
    setInterval(() => {
        createRandomNotification();
    }, Math.random() * 5000 + 3000);
});

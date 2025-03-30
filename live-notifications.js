// live-notifications.js
document.addEventListener('DOMContentLoaded', function() {
    // 접수 알림을 표시할 컨테이너 생성 및 추가
    const notificationContainer = document.createElement('div');
    notificationContainer.className = 'live-notification-container';
    document.body.appendChild(notificationContainer);

    // CSS 스타일 추가
    const style = document.createElement('style');
    style.textContent = `
        .live-notification-container {
            position: fixed;
            left: 0;
            top: 0;
            width: 300px;
            height: 100vh;
            background-color: rgba(51, 51, 51, 0.95);
            color: white;
            z-index: 998;
            overflow: hidden;
            font-family: 'Pretendard', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
        }

        .live-notification {
            display: flex;
            padding: 10px 15px;
            margin: 5px;
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 30px;
            align-items: center;
            animation: slideUp 10s linear forwards;
            position: relative;
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

        @keyframes slideUp {
            0% {
                transform: translateY(0);
                opacity: 1;
            }
            80% {
                opacity: 1;
            }
            100% {
                transform: translateY(-500px);
                opacity: 0;
            }
        }

        .notification-counter {
            position: absolute;
            right: 20px;
            top: 20px;
            background-color: #1B5E20;
            color: white;
            border-radius: 10px;
            padding: 15px 25px;
            font-size: 18px;
            font-weight: bold;
            text-align: center;
            z-index: 999;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }

        .counter-date {
            font-size: 14px;
            opacity: 0.8;
            margin-bottom: 5px;
        }

        .counter-value {
            font-size: 36px;
            line-height: 1;
        }

        .counter-label {
            font-size: 16px;
            margin-top: 5px;
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
    let counterValue = 500;
    
    counterElement.innerHTML = `
        <div class="counter-date">${dateStr}</div>
        <div class="counter-value">${counterValue}</div>
        <div class="counter-label">건</div>
    `;
    document.body.appendChild(counterElement);

    // 상세보기 버튼 추가
    const detailButton = document.createElement('a');
    detailButton.className = 'detail-button';
    detailButton.href = '#';
    detailButton.textContent = '상세보기';
    notificationContainer.appendChild(detailButton);

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
        
        notificationContainer.appendChild(notification);
        
        // 일정 시간 후 알림 제거
        setTimeout(() => {
            notification.remove();
        }, 10000);
        
        // 카운터 증가
        counterValue++;
        document.querySelector('.counter-value').textContent = counterValue;
    }

    // 초기 알림 몇 개 추가
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createRandomNotification();
        }, i * 500);
    }

    // 주기적으로 새 알림 생성 (3~8초 간격)
    setInterval(() => {
        createRandomNotification();
    }, Math.random() * 5000 + 3000);
});

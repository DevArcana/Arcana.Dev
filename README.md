# Arcana

React + TypeScript + Vite 기반 개인 홈페이지입니다. Tailwind CSS, Framer Motion, Lucide를 사용합니다.

## 실행

Node.js 22.12 이상 권장.

```sh
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

Windows PowerShell에서 npm 실행 정책 오류가 나면 `npm.cmd run dev`처럼 사용하세요.

## 콘텐츠 편집

- `src/data/profile.ts`: 프로필, 소개, 기술, 메뉴, 섹션 문구
- `src/data/interests.ts`: 관심사와 리듬게임
- `src/data/projects.ts`: 프로젝트 추가/삭제, 이미지와 링크
- `src/data/links.ts`: GitHub, Discord, X URL
- `public/favicon.svg`: 파비콘
- `index.html`: 검색 및 Open Graph 메타데이터

소셜 URL은 확인되지 않아 미설정 상태입니다. links.ts의 url에 실제 주소를 입력하면 외부 링크가 활성화됩니다. 프로젝트의 github와 demo도 선택 필드입니다.
프로젝트 이미지를 public/projects에 넣고 image: '/projects/filename.webp'를 지정하세요. 이미지가 없거나 로드에 실패하면 자체 제작한 콘셉트 그래픽이 표시됩니다. 실제 게임 화면이나 공식 로고가 아닙니다.
배포 주소가 확정되면 index.html에 절대 URL의 og:url, og:image 및 canonical을 추가하세요.

## 배포

`npm run build`로 생성한 `dist/`를 정적 호스팅에 업로드합니다. 백엔드, 데이터베이스, 환경변수는 필요하지 않습니다.

## GitHub Pages

1. 저장소 Settings → Pages로 이동합니다.
2. Build and deployment의 Source를 GitHub Actions로 선택합니다.
3. Actions → Deploy to GitHub Pages → Run workflow에서 main을 선택합니다.
4. build와 deploy 작업이 성공하면 https://devarcana.github.io/Arcana.Dev/ 에서 확인합니다.
5. 이후 main에 push하면 자동으로 다시 배포됩니다.

워크플로: `.github/workflows/deploy.yml`. Node.js 24에서 npm ci, lint, build를 실행한 뒤 dist를 배포합니다.
소스 브랜치를 배포하는 방식이나 별도 gh-pages 브랜치는 필요하지 않습니다.
프로덕션 base 경로는 `/Arcana.Dev/`이며 개발 서버는 `/`를 사용합니다.
사용자 도메인을 연결할 경우 vite.config.ts의 production base를 `/`로 바꾸세요.

public 아래 프로젝트 이미지는 `image: "projects/example.webp"`처럼 설정하세요.
앞에 /를 붙인 경로도 현재 배포 경로를 기준으로 처리하며, https:// 외부 이미지 주소는 그대로 사용할 수 있습니다.

로컬 배포 빌드 확인:
```sh
npm run build
npm run preview
```
http://127.0.0.1:4173/Arcana.Dev/ 에 접속합니다. 종료는 Ctrl+C입니다.

브라우저 테스트는 Microsoft Edge가 설치된 환경에서 `npm test`로 실행합니다.

공식 가이드: [Vite GitHub Pages](https://vite.dev/guide/static-deploy#github-pages), [GitHub Pages 게시 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).


# 실행 
 - docker-compose up -d
 - docker-compose up --build -d
 ### 컨테이너 재시작
 - docker-compose restart [서비스명]
 - docker-compose restart
 ### 중지 
 - docker-compose down
 ### 빌드
 - docker-compose build 
 ### pull
 - docker-compose pull
 ### 프로세스 확인
 - docker-compose ps
 ### 명령어 실행 bash 
 - docker-compose exec [서비스명] [명령어]
 - docker-compose exec web bash
 ### 로그 
 - docker-compose logs
 - docker-compose logs -f




# github 
- github 다운로드 및 설치 
- vscode extensions - github pull requests 설치 
- git bash 실행 
  git config user.name "github 이름"
  git config user.email "github 가입 email"
- github.com 에서 new repository (public)
- github 연동 
  vscode terminal + git bash 실행 
  
  git status 
  
  Initialize a new Git repository
  git init
  
  Add all files to the staging area
  git add -A 
  
  Commit the changes
  git commit -m "message" 
  
  Main branch 이름을 main으로 정의
  git branch -M main
  
  git 연동
  git remote add origin https://github.com/github이름/repository.git
  git push -u origin main 

# 오류 
## There is no tracking information for the current branch.
현재 작업 중인 로컬 브랜치가 원격 저장소의 어떤 브랜치와 연결되어 있는지 알 수 없기 때문
해결 방법 2개 
1. git pull --rebase origin main
2. git branch --set-upstream-to=origin/main

## The requested URL returned error: 403
인증은 성공했지만, 해당 저장소에 접근할 권한이 없다
1. github.com Settings > Developer settings > Personal access tokens > create new token > check repo, workflow 
2. Windows: 제어판 > 사용자 계정 > 자격 증명 관리자 > Windows 자격 증명 > git:https://github.com 관련 삭제 



# 자주 사용 명령어 
git init	
현재 디렉토리를 Git 저장소로 초기화합니다.	

git clone https://github.com/user/repo.git
원격 저장소를 로컬로 복제합니다.	


git add index.html
변경된 파일을 스테이징 영역에 추가합니다.	

git add .	
모든 변경된 파일을 스테이징 영역에 추가합니다.	


git commit -m "<message>"	
스테이징된 변경 사항을 저장소에 기록합니다. 메시지는 변경 내용을 요약합니다.	


git status	
현재 저장소의 상태를 확인합니다.	

git log	
커밋 기록을 확인합니다.

git remote add origin https://github.com/user/repo.git
로컬 저장소에 원격 저장소를 연결합니다.	


git push -u origin <branch>	
로컬 저장소의 커밋을 원격 저장소로 업로드합니다. -u 옵션은 초기 설정 시 사용됩니다.	

git pull origin <branch>	
원격 저장소의 최신 변경 사항을 로컬로 가져옵니다.	

git branch	
현재 브랜치 목록을 확인합니다.	


git checkout <branch>	
다른 브랜치로 전환합니다.	

git merge <branch>	
지정된 브랜치를 현재 브랜치로 병합합니다.	


git config --global user.name "Your Name"
Git에 사용할 사용자 이름을 설정합니다.	

git config --global user.email "youremail@example.com"
Git에 사용할 사용자 이메일을 설정합니다.	

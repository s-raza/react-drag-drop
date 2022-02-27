# React Drag and Drop Sample Application

A sample application to demonstrate drag and drop functionality using React as the frontend and Flask as the backend, all packaged into a Kubernetes Service.  
<br>

<img src="./react-dnd.gif"/>  
<br>

The application demonstrates a part of an Influencer Management System. In this scenario we have a group of videos that can be assigned to different Influencers. Each group of videos is organized into campaigns.

Campaigns can be dragged and dropped onto Influencers to make an association signifying that which Influencer should promote what videos.

A folder can be defined in the Flask backend, the structure of which is modeled into the frontend.

```
content-dist/
├── Campaign_1
│   ├── vidtype_1.1
│   │   ├── vid_1.1.1_1.5MB.mp4
│   │   ├── vid_1.1.2_3MB.mp4
│   │   ├── vid_1.1.3_9.5MB.mp4
│   │   └── vid_1.1.4_17.4MB.mp4
│   ├── vidtype_1.2
│   │   ├── vid_1.2.1_1.5MB.mp4
│   │   ├── vid_1.2.2_3MB.mp4
│   │   ├── vid_1.2.3_9.5MB.mp4
│   │   └── vid_1.2.4_17.4MB.mp4
│   └── vidtype_1.3
│       ├── vid_1.3.1_1.5MB.mp4
│       ├── vid_1.3.2_3MB.mp4
│       ├── vid_1.3.3_9.5MB.mp4
│       └── vid_1.3.4_17.4MB.mp4
├── Campaign_2
│   ├── vidtype_2.1
│   │   ├── vid_2.1.1_1.5MB.mp4
│   │   ├── vid_2.1.2_3MB.mp4
│   │   ├── vid_2.1.3_9.5MB.mp4
│   │   └── vid_2.1.4_17.4MB.mp4
│   ├── vidtype_2.2
│   │   ├── vid_2.2.1_1.5MB.mp4
│   │   ├── vid_2.2.2_3MB.mp4
│   │   ├── vid_2.2.3_9.5MB.mp4
│   │   └── vid_2.2.4_17.4MB.mp4
│   └── vidtype_2.3
│       ├── vid_2.3.1_1.5MB.mp4
│       ├── vid_2.3.2_3MB.mp4
│       ├── vid_2.3.3_9.5MB.mp4
│       └── vid_2.3.4_17.4MB.mp4
└── Campaign_3
    ├── vidtype_3.1
    │   ├── vid_3.1.1_1.5MB.mp4
    │   ├── vid_3.1.2_3MB.mp4
    │   ├── vid_3.1.3_9.5MB.mp4
    │   └── vid_3.1.4_17.4MB.mp4
    ├── vidtype_3.2
    │   ├── vid_3.2.1_1.5MB.mp4
    │   ├── vid_3.2.2_3MB.mp4
    │   ├── vid_3.2.3_9.5MB.mp4
    │   └── vid_3.2.4_17.4MB.mp4
    └── vidtype_3.3
        ├── vid_3.3.1_1.5MB.mp4
        ├── vid_3.3.2_3MB.mp4
        ├── vid_3.3.3_9.5MB.mp4
        └── vid_3.3.4_17.4MB.mp4
```

The above folder structure is used to render the draggables when the React frontend is first loaded. The top level folders i.e. Campaign_1, Campaign_2 and Campaign_3 become the draggables and can be assigned to Infleuncers by dragging and dropping.

## Setup

All the following instructions have been tested with the following pre-requisites

1. OS: Windows 10 Pro
2. Docker desktop installed locally
3. Kubernetes enabled in Docker desktop settings
<br>

**Build Images**

The demo app is implemented in two parts, the frontend using React and the backend using Flask. Each of these parts have their own docker images.

The React frontend communicates with the Flask backend internally within the Kubernetes cluster.

Build the React frontend image

```
C:\react-drag-drop> docker build -t dnd-react-frontend:latest -f .\frontend\Dockerfile .
```

Build the Flask backend image

```
C:\react-drag-drop> docker build -t dnd-flask-backend:latest -f .\backend\Dockerfile .
```

Apply the Kubernetes YAML configurations to start the app

```
C:\react-drag-drop>kubectl apply -f dnd-flask-backend.yaml -f dnd-react-frontend.yaml
```

Confirm that the app is running

```
C:\react-drag-drop> kubectl get pods
NAME                                  READY   STATUS    RESTARTS   AGE
dnd-flask-backend-5f55f7b8bb-4652c    1/1     Running   0          5s
dnd-flask-backend-5f55f7b8bb-s4vnl    1/1     Running   0          5s
dnd-flask-backend-5f55f7b8bb-xrvhd    1/1     Running   0          5s
dnd-react-frontend-74c557fc8b-h8vnk   1/1     Running   0          5s
dnd-react-frontend-74c557fc8b-hvd9k   1/1     Running   0          5s
dnd-react-frontend-74c557fc8b-tf4mc   1/1     Running   0          5s

C:\react-drag-drop> kubectl get deploy
NAME                 READY   UP-TO-DATE   AVAILABLE   AGE
dnd-flask-backend    3/3     3            3           20s
dnd-react-frontend   3/3     3            3           20s

C:\react-drag-drop> kubectl get svc 
NAME                 TYPE           CLUSTER-IP     EXTERNAL-IP   PORT(S)          AGE
dnd-flask-backend    ClusterIP      10.98.74.191   <none>        5000/TCP         11s
dnd-react-frontend   LoadBalancer   10.96.17.217   localhost     3000:30285/TCP   10s
kubernetes           ClusterIP      10.96.0.1      <none>        443/TCP          14h
```

The app can now be accessed at `http://localhost:3000`

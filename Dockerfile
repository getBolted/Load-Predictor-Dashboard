FROM debian:latest

RUN apt-get update -y \ 
    && apt-get install git software-properties-common python3.7 python3-pip -y

WORKDIR /home/workdir

RUN pip3 install flask gunicorn

COPY . /home/workdir

EXPOSE 31700
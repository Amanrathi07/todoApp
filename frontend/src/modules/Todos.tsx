import { Button } from "../components/ui/button";
import { AddTodo } from "./AddTodo";
import ShowData from "./ShowData";
import { useEffect, useRef } from "react";
import { refetchTodos } from "../functions/refetchTodos";
import useAuth from "../hooks/useAuth";

import { checkChange } from "../functions/checkChange";
import { sendTodos } from "../functions/sendTodos";

export interface todoResType {
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  status: "synced";
}

export default function Todos({ status }: { status: string }) {
  const { auth } = useAuth();

  const workerRef = useRef<Worker | null>(null);
    // make a cranker
  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../worker/sync.worker.ts", import.meta.url),
      { type: "module" },
    );
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  // call a cranker if status is unsync and the vrowser if come online after ofline
  useEffect(() => {
    const worker = workerRef.current;
    if (!worker) return;

    const handleOnline = () => {
      if (status === "unsynced") {
        worker.postMessage({ message: "unsync" , auth });
      }
    };

    window.addEventListener("online", handleOnline);

    if (navigator.onLine && status === "unsynced") {
      worker.postMessage({ message: "unsync" , auth });
    }

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, [status]);

 // listion to the cranker
  useEffect(() => {
    const worker = workerRef.current;
    if (!worker) return;

    worker.onmessage = (e) => {
      const { type } = e.data;

      if (type === "SYNC_SUCCESS") {
        status = "synced";
      }

      if (type === "SYNC_FAILED") {
        status = "unsynced";
      }
    };
  }, []);


  useEffect(() => {
    let checkInterval: null | number = null;

    if (!!auth) {
      checkInterval = setInterval(() => {
        checkChange();
      }, 5000);
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [auth]);

  return (
    <div className=" flex flex-col gap-10 items-center justify-center">
      <div className="flex gap-4">
        <Button onClick={() => sendTodos(auth)}>{status}</Button>
        <Button onClick={refetchTodos}>refetch</Button>
      </div>
      <AddTodo />
      <ShowData />
    </div>
  );
}

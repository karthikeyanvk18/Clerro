import { motion } from "framer-motion";

export function PageLoader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div className="space-y-4 text-center">
        <motion.div
          className="flex justify-center gap-2"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="h-3 w-3 rounded-full bg-emerald" />
          <div className="h-3 w-3 rounded-full bg-emerald" />
          <div className="h-3 w-3 rounded-full bg-emerald" />
        </motion.div>
        <p className="text-sm text-muted-foreground">Loading...</p>
      </motion.div>
    </motion.div>
  );
}

export function PageSkeleton() {
  return (
    <div className="space-y-4 p-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-4 bg-muted rounded-lg w-3/4 animate-pulse" />
          <div className="h-8 bg-muted rounded-lg animate-pulse" />
        </div>
      ))}
    </div>
  );
}

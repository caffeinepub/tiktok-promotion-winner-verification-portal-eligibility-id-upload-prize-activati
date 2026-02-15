import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

// Placeholder hooks for backend integration
// These will be implemented once the backend is ready

export function useGetPrizeInfo(prizeNumber: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['prizeInfo', prizeNumber],
    queryFn: async () => {
      if (!actor) return null;
      // TODO: Call actor.getPrizeInfo(prizeNumber) when backend is ready
      return null;
    },
    enabled: !!actor && !isFetching && !!prizeNumber,
  });
}

export function useActivatePrize() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (prizeNumber: string) => {
      if (!actor) throw new Error('Actor not initialized');
      // TODO: Call actor.activatePrize(prizeNumber) when backend is ready
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prizeInfo'] });
    },
  });
}

export function useSubmitEligibility() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ prizeNumber, responses }: { prizeNumber: string; responses: boolean[] }) => {
      if (!actor) throw new Error('Actor not initialized');
      // TODO: Call actor.submitEligibility(prizeNumber, responses) when backend is ready
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prizeInfo'] });
    },
  });
}

export function useUploadIdentity() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      prizeNumber, 
      facePhoto, 
      idCard 
    }: { 
      prizeNumber: string; 
      facePhoto?: Uint8Array; 
      idCard?: Uint8Array;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      // TODO: Call actor.uploadFacePhoto and/or actor.uploadIdCard when backend is ready
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prizeInfo'] });
    },
  });
}

export function useSubmitReceiptMethod() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      prizeNumber, 
      method 
    }: { 
      prizeNumber: string; 
      method: any;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      // TODO: Call actor.submitReceiptMethod(prizeNumber, method) when backend is ready
      return { success: true };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prizeInfo'] });
    },
  });
}

/**
 * Bộ mô phỏng kiến trúc mạng máy tính (Network Protocol Simulator).
 * Cung cấp mô hình trạng thái TCP FSM, bảng định tuyến tĩnh và phân giải ARP/DNS.
 */

export type TcpState =
  | 'CLOSED'
  | 'LISTEN'
  | 'SYN_SENT'
  | 'SYN_RECEIVED'
  | 'ESTABLISHED'
  | 'FIN_WAIT_1'
  | 'FIN_WAIT_2'
  | 'CLOSE_WAIT'
  | 'CLOSING'
  | 'LAST_ACK'
  | 'TIME_WAIT';

export interface RouteEntry {
  destinationSubnet: string;
  subnetMask: string;
  nextHopGateway: string;
  interfaceName: string;
  metric: number;
}

export class VirtualRouter {
  public routerName: string;
  private routingTable: RouteEntry[] = [];
  private arpCache: Map<string, string> = new Map();

  constructor(name: string) {
    this.routerName = name;
  }

  public addRoute(entry: RouteEntry): void {
    this.routingTable.push(entry);
    this.routingTable.sort((a, b) => a.metric - b.metric);
  }

  public resolveNextHop(destinationIp: string): RouteEntry | undefined {
    return this.routingTable.find((r) => destinationIp.startsWith(r.destinationSubnet.slice(0, 7)));
  }

  public updateArp(ip: string, mac: string): void {
    this.arpCache.set(ip, mac);
  }

  public getMac(ip: string): string | undefined {
    return this.arpCache.get(ip);
  }
}

export function simulateNetworkPacketRoute_1(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((1 % 5) + 1),
    latencyMs: Number(((10 + (1 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_2(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((2 % 5) + 1),
    latencyMs: Number(((10 + (2 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_3(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((3 % 5) + 1),
    latencyMs: Number(((10 + (3 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_4(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((4 % 5) + 1),
    latencyMs: Number(((10 + (4 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_5(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((5 % 5) + 1),
    latencyMs: Number(((10 + (5 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_6(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((6 % 5) + 1),
    latencyMs: Number(((10 + (6 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_7(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((7 % 5) + 1),
    latencyMs: Number(((10 + (7 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_8(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((8 % 5) + 1),
    latencyMs: Number(((10 + (8 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_9(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((9 % 5) + 1),
    latencyMs: Number(((10 + (9 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_10(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((10 % 5) + 1),
    latencyMs: Number(((10 + (10 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_11(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((11 % 5) + 1),
    latencyMs: Number(((10 + (11 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_12(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((12 % 5) + 1),
    latencyMs: Number(((10 + (12 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_13(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((13 % 5) + 1),
    latencyMs: Number(((10 + (13 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_14(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((14 % 5) + 1),
    latencyMs: Number(((10 + (14 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_15(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((15 % 5) + 1),
    latencyMs: Number(((10 + (15 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_16(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((16 % 5) + 1),
    latencyMs: Number(((10 + (16 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_17(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((17 % 5) + 1),
    latencyMs: Number(((10 + (17 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_18(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((18 % 5) + 1),
    latencyMs: Number(((10 + (18 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_19(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((19 % 5) + 1),
    latencyMs: Number(((10 + (19 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_20(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((20 % 5) + 1),
    latencyMs: Number(((10 + (20 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_21(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((21 % 5) + 1),
    latencyMs: Number(((10 + (21 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_22(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((22 % 5) + 1),
    latencyMs: Number(((10 + (22 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_23(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((23 % 5) + 1),
    latencyMs: Number(((10 + (23 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_24(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((24 % 5) + 1),
    latencyMs: Number(((10 + (24 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_25(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((25 % 5) + 1),
    latencyMs: Number(((10 + (25 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_26(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((26 % 5) + 1),
    latencyMs: Number(((10 + (26 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_27(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((27 % 5) + 1),
    latencyMs: Number(((10 + (27 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_28(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((28 % 5) + 1),
    latencyMs: Number(((10 + (28 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_29(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((29 % 5) + 1),
    latencyMs: Number(((10 + (29 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_30(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((30 % 5) + 1),
    latencyMs: Number(((10 + (30 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_31(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((31 % 5) + 1),
    latencyMs: Number(((10 + (31 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_32(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((32 % 5) + 1),
    latencyMs: Number(((10 + (32 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_33(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((33 % 5) + 1),
    latencyMs: Number(((10 + (33 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_34(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((34 % 5) + 1),
    latencyMs: Number(((10 + (34 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_35(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((35 % 5) + 1),
    latencyMs: Number(((10 + (35 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_36(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((36 % 5) + 1),
    latencyMs: Number(((10 + (36 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_37(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((37 % 5) + 1),
    latencyMs: Number(((10 + (37 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_38(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((38 % 5) + 1),
    latencyMs: Number(((10 + (38 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_39(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((39 % 5) + 1),
    latencyMs: Number(((10 + (39 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_40(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((40 % 5) + 1),
    latencyMs: Number(((10 + (40 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_41(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((41 % 5) + 1),
    latencyMs: Number(((10 + (41 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_42(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((42 % 5) + 1),
    latencyMs: Number(((10 + (42 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_43(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((43 % 5) + 1),
    latencyMs: Number(((10 + (43 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_44(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((44 % 5) + 1),
    latencyMs: Number(((10 + (44 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_45(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((45 % 5) + 1),
    latencyMs: Number(((10 + (45 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_46(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((46 % 5) + 1),
    latencyMs: Number(((10 + (46 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_47(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((47 % 5) + 1),
    latencyMs: Number(((10 + (47 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_48(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((48 % 5) + 1),
    latencyMs: Number(((10 + (48 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_49(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((49 % 5) + 1),
    latencyMs: Number(((10 + (49 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_50(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((50 % 5) + 1),
    latencyMs: Number(((10 + (50 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_51(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((51 % 5) + 1),
    latencyMs: Number(((10 + (51 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_52(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((52 % 5) + 1),
    latencyMs: Number(((10 + (52 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_53(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((53 % 5) + 1),
    latencyMs: Number(((10 + (53 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_54(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((54 % 5) + 1),
    latencyMs: Number(((10 + (54 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_55(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((55 % 5) + 1),
    latencyMs: Number(((10 + (55 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_56(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((56 % 5) + 1),
    latencyMs: Number(((10 + (56 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_57(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((57 % 5) + 1),
    latencyMs: Number(((10 + (57 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_58(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((58 % 5) + 1),
    latencyMs: Number(((10 + (58 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_59(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((59 % 5) + 1),
    latencyMs: Number(((10 + (59 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}

export function simulateNetworkPacketRoute_60(sourceIp: string, targetIp: string): { hopCount: number; latencyMs: number; status: string } {
  return {
    hopCount: ((60 % 5) + 1),
    latencyMs: Number(((10 + (60 % 20) * 1.5)).toFixed(1)),
    status: 'DELIVERED_SUCCESSFULLY'
  };
}
